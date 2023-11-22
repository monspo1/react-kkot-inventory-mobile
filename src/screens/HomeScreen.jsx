// https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator
// https://web-ridge.github.io/react-native-paper-dates/docs/date-picker/single-date-picker
// https://callstack.github.io/react-native-paper/docs/guides/icons/
// https://reactnative.dev/docs/0.70/colors
// https://pictogrammers.com/library/mdi/
import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderStatus, setBoxesData, setNewBoxInitial, setCurBoxId } from '../actions/action'
import { View, ScrollView, Dimensions } from "react-native";
import { ActivityIndicator, Button, Divider, Modal, Text, TextInput, HelperText, } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getUniqueId } from "../utils/helper";
import 'firebase/firestore';
import { collection, getDocs, Timestamp, writeBatch, doc } from 'firebase/firestore'; 
import { db, auth } from '../../src/utils/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import customStyles from "../styles/customStyles";
import TodayStatComponent from "../components/TodayStatComponent"
import LoginStatusComp from '../components/LoginStatusComp';
import BoxListElem from '../components/BoxListElem';
import NoElemComp from '../components/NoElemComp';
import { tempDataForBoxList } from "../constants/constants";
// import { DatePickerModal } from "react-native-paper-dates";

const HomeScreenContent = ({ navigation }) => {
  const [currentUser, setCurrentUser] = React.useState(null); // firebase auth 상태 추적용
  // const [date, setDate] = React.useState(undefined);
  // const [openDatePickerModal, setOpenDatePickerModal] = React.useState(false);
  const [visibleAddNewBoxModal, setVisibleAddNewBoxModal] = React.useState(false)
  const [textForNewBoxInitial, setTextForNewBoxInitial] = React.useState('')
  const [newBoxInitialError, setNewBoxInitialError] = React.useState(false);

  const styles = customStyles();
  const spinner = useSelector(state => state.loading);
  const boxesData = useSelector(state => state.boxesData);
  // const curLoggedinUser = useSelector(state => state.curLoggedinUser);
  // const windowWidth = useWindowDimensions().width;
  const screenHeight = Dimensions.get('window').height;

  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(setLoaderStatus(true))
    dispatch(setLoaderStatus(false))
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // useEffect(() => { // navigation page change
  //   const screenSwitch = navigation.addListener('focus', () => {
  //     fetchBoxesData();
  //   });
  //   return screenSwitch;
  // }, [navigation])

  useEffect(() => {
    // 로그인 상태 변경 감지
    // const authUnsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     fetchBoxesData();
    //   }
    // });

    // 화면 전환 & 로그인 상태 감지
    const screenSwitch = navigation.addListener('focus', () => {
      if (auth.currentUser) { // 로그인 상태일 때만 데이터를 불러옴
        // fetchBoxesData(); // <= 요것만 다시 복구.
      }
    });

    return () => {
      // authUnsubscribe(); 
      screenSwitch();
    };
  }, [navigation]);


  const fetchBoxesData = async () => {
    // console.log('fetching data - ', currentUser.email)
    dispatch(setLoaderStatus(true))
    const boxCollection = collection(db, 'boxes'); // db를 사용하여 collection을 가져옵니다
    const boxSnapshot = await getDocs(boxCollection); // 문서를 가져옵니다
    const receivedData = boxSnapshot.docs.map(doc => {
      const data = doc.data();
      for (let field in data) {
        if (data[field] instanceof Timestamp) {
          data[field] = data[field].toDate().toISOString();
        }
      }
      return { ...data, id: doc.id };
    });
    // console.log('curUser: ', curLoggedinUser?.email, 'boxData: ', receivedData)
    // setData(receivedData); 
    console.log('boxesData: ', receivedData)
    dispatch(setBoxesData(receivedData))
  };


  const showAddNewBoxModal = () => setVisibleAddNewBoxModal(true);
  const hideAddNewBoxModal = () => setVisibleAddNewBoxModal(false);

  const newBoxInitialRegex = /^[A-Za-z]{2,3}-[0-9]{1,2}$/
  
  const handleNewBoxInitialTextChange = (boxInitial) => {
    setTextForNewBoxInitial(boxInitial);
    setNewBoxInitialError(!newBoxInitialRegex.test(boxInitial));
    // setLoginResMsg('')
  };

  // const validRange = useMemo(() => {
  //   return { startDate: new Date(0), endDate: new Date() };
  // }, []);

  // const onDismissSingle = React.useCallback(() => {
  //   setOpenDatePickerModal(false);
  // }, [setOpenDatePickerModal]);

  // const onConfirmSingle = React.useCallback(
  //   (params) => {
  //     setOpenDatePickerModal(false);
  //     setDate(params.date);
  //   },
  //   [setOpenDatePickerModal, setDate]
  // );

  const submitCreateNewBoxModal = () => {
    const newBoxId = `box-${getUniqueId()}`
    dispatch(setCurBoxId(newBoxId))
    dispatch(setNewBoxInitial(textForNewBoxInitial))
    hideAddNewBoxModal()
    navigation.navigate('ItemListScreen')
  }

  const shouldDisableCreateNewBoxBtn = () => {
    return !(textForNewBoxInitial !== "" && newBoxInitialError === false)
  }

  return (
    <>
      <LoginStatusComp/>
      <ActivityIndicator animating={spinner} hidesWhenStopped={true}
        style={{ position: 'absolute', top: '40%', left: '50%'}} size="large"/>
      <ScrollView style={{ height: screenHeight}} 
            contentContainerStyle={{ justifyContent: "flex-start", alignItems: "stretch" }}>
        <TodayStatComponent/>
        {/* <View style={styles.containerForTodayWorkSummary}>
          <Card.Title
            style={styles.workStatStyle}
            title="Today's Stat"
            titleStyle={{ fontSize: 30, lineHeight: 35 }} // 제목 크기 조절
            subtitle={
              <View>
                <Text style={styles.coloredBulletPointWrapper}>
                  <Text style={styles.coloredBulletPoint}>
                    ● Selected Date:{" "}
                  </Text>
                  {date ? date.toDateString() : getTodayString()}
                </Text>
                <Text style={styles.coloredBulletPointWrapper}>
                  <Text style={styles.coloredBulletPoint}>● Total Boxes: </Text>
                  35
                </Text>
                <Text style={styles.coloredBulletPointWrapper}>
                  <Text style={styles.coloredBulletPoint}>● Total Items: </Text>
                  134
                </Text>
                <Text style={styles.coloredBulletPointWrapper}>
                  <Text style={styles.coloredBulletPoint}>
                    ● Total Weights:{" "}
                  </Text>
                  734.93
                </Text>
              </View>
            }
            right={(props) => (
              <IconButton
                icon="calendar"
                size={50}
                mode={"contained"} // iconColor={MD3Colors.error50}
                style={{ marginRight: 30 }}
                onPress={() => setOpenDatePickerModal(true)}
              />
            )}
          />
        </View> */}
        <View style={[styles.horizontalButtonContainer, { marginBottom: 65 }]}> 
            <Button mode="contained-tonal" icon="plus" 
                labelStyle={styles.bigButtonLabelStyle} 
                style={styles.scanButtonStyle} 
                onPress={showAddNewBoxModal}>
                New Box
            </Button>
        </View>
        <Divider />
        {/* <Card.Title
          title="BOX LIST"
          titleStyle={{ fontSize: 30, lineHeight: 35 }}
        />
        <Divider /> */}
        {
          (boxesData.length === 0) 
          ? <NoElemComp targetString="box"/>
          : boxesData.map((elem, idx) => <BoxListElem elem={elem} key={`key-${idx}`} idx={idx} />)
        }
        {
          tempDataForBoxList.map((elem, idx) => {
            return <BoxListElem elem={elem} key={`key-${idx}`} idx={idx} />
          })
        }
        {/* {tempDataForBoxList.map((elem, idx) => {
          const descLocal = `TOTAL: ${elem.item_count} items  |  ${elem.item_weight} (lbs)  |  ${elem.items_price}`;
          return (
            <View key={idx} style={{ width: "100%" }}>
              <List.Item
                style={styles.boxListContainer}
                title={elem.box_initial}
                titleStyle={{ fontSize: windowWidth * 0.05 }}
                description={descLocal}
                descriptionStyle={{
                  fontSize: windowWidth * 0.022,
                  color: "gray",
                }}
                left={(props) => (
                  <Avatar.Icon
                    size={70}
                    icon="package-variant-closed"
                    backgroundColor={getRandomColor()}
                  />
                )}
                right={() => (
                  <IconButton
                    icon="chevron-right"
                    size={50} // mode={'contained'} or mode={'outlined'}
                    onPress={() =>
                      navigation?.push("ItemListScreen", { selected: idx })
                    }
                  />
                )}
                onPress={() =>
                  navigation?.push("ItemListScreen", { selected: idx })
                }
              />
              <Divider />
            </View>
          );
        })} */}

        {/* <FAB
          icon="plus"
          style={styles.fabStyle}
          label="NEW BOX"
          onPress={showAddNewBoxModal}
        /> */}
      </ScrollView>    
      <Modal
        visible={visibleAddNewBoxModal}
        onDismiss={hideAddNewBoxModal}
        // contentContainerStyle={styles.modalContainer}
        contentContainerStyle={styles.addNewBoxModalContainer}
      >
        <Text variant="headlineLarge">Adding a New Box</Text>
        <TextInput
          label="CREATOR" disabled textColor="#777"
          style={styles.addNewBoxModalTextInput}
          value={currentUser ? currentUser.email.split('@')[0] : ""}
          onChangeText={text => setText(text)}
        />

        <TextInput
            label="Enter a box initial" mode="outlined"
            style={styles.addNewBoxModalTextInput}
            value={textForNewBoxInitial}
            onChangeText={text => handleNewBoxInitialTextChange(text.toUpperCase())}
            error={newBoxInitialError}
            placeholder="Enter a box initial (e.g, AB-01 or BBB-99)"
        />
        <HelperText type="error" visible={newBoxInitialError} style={styles.addNewBoxModalErrorMessage}>
          NOT Valid!  Enter 2 or 3 letters, followed by a hyphen, then a number from 0 to 99 (e.g, AB-01 or BBB-77)
        </HelperText>
        
        <View style={styles.horizontalButtonContainer}>
          <Button icon="window-close" mode="contained-tonal" labelStyle={styles.bigButtonLabelStyle}
            style={[styles.horizontalButton, styles.bigButtonStyle]}
            onPress={hideAddNewBoxModal}>CANCEL</Button>
          <Button icon="plus-thick" mode="contained-tonal" 
            disabled={shouldDisableCreateNewBoxBtn()} labelStyle={styles.bigButtonLabelStyle}
            style={[styles.horizontalButton, styles.bigButtonStyle]}
            onPress={submitCreateNewBoxModal}>CREATE</Button>
        </View>
      </Modal>
      {/* <Portal>
        <Modal
          visible={openDatePickerModal}
          onDismiss={onDismissSingle}
          contentContainerStyle={styles.modalContainer}
        >
          <DatePickerModal
            locale="en"
            mode="single"
            visible={openDatePickerModal}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
            validRange={validRange}
          />
        </Modal>
      </Portal> */}
    </>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <HomeScreenContent navigation={navigation} />
    </SafeAreaProvider>
  );
};

export default HomeScreen;
