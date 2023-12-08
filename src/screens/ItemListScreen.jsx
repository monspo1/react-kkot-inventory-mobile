import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackHandler, View, ScrollView } from "react-native";
import { Icon, Button, Dialog, Text, TextInput } from "react-native-paper";
import { setBoxItems, setLoaderStatus } from "../actions/action";
import { getUniqueId } from "../utils/helper";
import ItemListElem from "./../components/ItemListElem";
import NoElemComp from "../components/NoElemComp";
import customStyles from "../styles/customStyles";
import barcodeStyles from "../styles/barcodeStyles";
import { getDocs, collection, writeBatch, doc, query, where } from "firebase/firestore";
import { db, auth } from "../../src/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import _ from "lodash";
// import { tempDataForItemList, tempDataForBoxList } from '../constants/constants';

const ItemListScreen = ({ route, navigation }) => {
  // const [textForBoxInitial, setTextForBoxInitial] = React.useState("");
  const [currentUser, setCurrentUser] = React.useState(null); // firebase auth 상태 추적용
  const [visibleManualDialog, setVisibleManualDialog] = useState(false);
  const [visibleBackBtnDialog, setVisibleBackBtnDialog] = useState(false);

  const [textForLookupBarcode, setTextForLookupBarcode] = useState('')
  const [receivedLookupItem, setReceivedLookupItem] = useState(null)
  // const [isBarcodeLookupNoResult, setIsBarcodeLookupNoResult] = useState(false);
  const [lookupResultMessage, setLookupResultMessage] = useState('');
  const [fetchBarcodeLookupError, setFetchBarcodeLookupError] = useState(false);
  // const [itemList, setItemList] = useState(tempDataForItemList);

  const dispatch = useDispatch();
  const styles = customStyles();
  const stylesForBarcode = barcodeStyles();
  const curBoxInitial = useSelector((state) => state.curBoxInitial);
  const curBoxId = useSelector((state) => state.curBoxId);
  const curBoxItems = useSelector((state) => state.curBoxItems);
  const boxesData = useSelector((state) => state.boxesData);
  const barcodeLookupSuccessMsg = 'Found item. Accept?'

  useEffect(() => {
    dispatch(setLoaderStatus(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // fetchBoxesData();
        setCurrentUser(user);
      }
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, []);

  useEffect(() => {
    // console.log('updated curBoxItems.len: ', curBoxItems.length)
    // console.log('updated curBoxItems: ', curBoxItems, '\n')
    dispatch(setLoaderStatus(false));
  }, [curBoxItems]);

  const showBackBtnWarningDialog = () => setVisibleBackBtnDialog(true);
  const hideBackBtnWarningDialog = () => setVisibleBackBtnDialog(false);
  const showManualDialog = () => setVisibleManualDialog(true);
  const hideManualDialog = () => {
    setVisibleManualDialog(false);
    setFetchBarcodeLookupError(false);
    setTextForLookupBarcode('')
    setLookupResultMessage('')
    setReceivedLookupItem(null)
    // setIsBarcodeLookupNoResult(false)
  };
  

  const handleDuplicate = (idx) => {
    const newItemList = [...curBoxItems];
    const newItem = {
      ...newItemList[idx],
      item_id: `item-${getUniqueId()}`,
      item_expiration: null,
    };
    newItemList.splice(idx + 1, 0, newItem);
    // setItemList(newItemList);
    dispatch(setBoxItems(newItemList));
  };

  const handleBackButton = () => {
    if (curBoxItems.length === 0) {
      navigation.goBack();
    } else {
      showBackBtnWarningDialog();
    }
    return true;
  }

  const handleNewItemBtn = () => {
    const newEmptyObj = {
      box_id: "",
      item_id: `item-${getUniqueId()}`,
      item_barcode: "",
      item_brand: "",
      item_content: "",
      item_expiration: null,
      item_weight_oz: "",
      item_weight_lbs: "",
      item_weight_g: "",
      item_price: "",
      item_category: null,
      item_count: "1",
    };
    navigation.navigate("ItemDetailScreen", { itemSelected: newEmptyObj });
  };

  const clickManualBarcodeButton = async () => {
    console.log("clickManualBarcodeButton");
    showManualDialog();
  };

  const handleBarcodeLookupTextChange = (value) => {
    setTextForLookupBarcode(value);
  }

  const lookupBarcodeBtnHandler = async () => {
    console.log('lookupBarcodeBtnHandler: ', textForLookupBarcode)
    try { // const barcode = "8809238009470";
      const masterItems = collection(db, "master-items");
      const q = query(masterItems, where("barcode", "==", textForLookupBarcode));
      const querySnapshot = await getDocs(q);
      let foundItem;
      querySnapshot.forEach((doc) => {
        foundItem = { ...doc.data(), id: doc.id };
      });
      console.log("received: ", foundItem);
      if (foundItem) {
        setReceivedLookupItem(foundItem)
        setLookupResultMessage(barcodeLookupSuccessMsg)
      } else {
        setReceivedLookupItem(null)
        setLookupResultMessage(`Not found. Ask 수녀님`)
      }
      setFetchBarcodeLookupError(false);
    } catch (error) {
      console.error("Error fetching item data: ", error);
      setReceivedLookupItem(null)
      setFetchBarcodeLookupError(true);
    }
  }

  const onAcceptFoundBarcode = () => {
    console.log('onAcceptFoundBarcode', receivedLookupItem)
    const resObj = {
      box_id: curBoxInitial, // <= Check!!! 전달된 box_id 필요
      item_id: `item-${getUniqueId()}`,
      item_barcode: receivedLookupItem.barcode,
      item_brand: receivedLookupItem.brand ? receivedLookupItem.brand : "",
      item_content: receivedLookupItem.content ? receivedLookupItem.content : "",
      item_expiration: null,
      item_weight_oz: receivedLookupItem.item_weight_oz
        ? receivedLookupItem.item_weight_oz: "",
      item_weight_lbs: receivedLookupItem.item_weight_lbs
        ? receivedLookupItem.item_weight_lbs : "",
      item_weight_g: receivedLookupItem.item_weight_g ? receivedLookupItem.item_weight_g : "",
      item_price: receivedLookupItem.item_price ? receivedLookupItem.item_price : "",
      item_category: receivedLookupItem.category ? receivedLookupItem.category : null,
      item_count: "1", // ???
    };
    
    // # 무조건 add하고 expireation은 ???로 나옴. 중복되면 제거가능. 
    let newBoxItems = [...curBoxItems];
    const index = newBoxItems.findIndex(item => item.item_id === resObj.item_id);
    if (index !== -1) { 
      newBoxItems[index] = resObj;
    }
    else newBoxItems.push(resObj);
    dispatch(setBoxItems(newBoxItems));
    setReceivedLookupItem(null)
    hideManualDialog();
  }

  const saveBoxItemsList = async () => {
    // console.log('ItemListScreen - curBoxItems: ', curBoxItems)
    let totalPrice = 0;
    let totalWeightLbs = 0;
    curBoxItems.forEach((elem) => {
      totalPrice += !isNaN(elem.item_price) ? Number(elem.item_price) : 0;
      totalWeightLbs += !isNaN(elem.item_weight_lbs)
        ? Number(elem.item_weight_lbs)
        : 0;
    });

    const boxPayload = {
      box_id: curBoxId,
      box_initial: curBoxInitial,
      updated: new Date(),
      items_count: curBoxItems.length,
      items_price: totalPrice,
      items_weight: totalWeightLbs,
    };
    // console.log('boxPayload: ', boxPayload)
    // console.log('curBoxItems: ', curBoxItems)

    const batch = writeBatch(db);
    const boxRef = doc(db, "boxes", boxPayload.box_id); // Create a document reference with box_id

    // Add boxPayload to boxes collection
    batch.set(boxRef, boxPayload);

    // For each item in curBoxItems, add it to box_items collection
    for (let item of curBoxItems) {
      const itemRef = doc(collection(boxRef, "box_items"), item.item_id); // Create a document reference with item_id in box_items collection
      batch.set(itemRef, item); // Add item to box_items collection
    }

    // Commit the batch
    batch
      .commit()
      .then(() => {
        console.log(
          `Successfully added box ${boxPayload.box_id} and its items to Firestore`
        );
        navigation.navigate("HomeScreen");
      })
      .catch((err) => {
        console.error(
          `Failed to add box ${boxPayload.box_id} and its items to Firestore: `,
          err
        );
      });
  };

  const shouldDisableSaveBtn = () => {
    // console.log('ItemListScreen - curBoxItems: ', curBoxItems)
    let shouldDisable = false;

    const found = boxesData.find((box) => box.box_id === curBoxItems.box_id);
    if (found) shouldDisable = _.isEqual(found, curBoxItems);
    if (curBoxItems.length === 0) shouldDisable = true;

    const emptyDate = curBoxItems.find((item) => item.item_expiration === null);
    if (emptyDate) return true;

    return shouldDisable;
  };


  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.viewContainer}>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <TextInput
              label="Box Initial"
              disabled
              textColor="#777"
              style={styles.addNewBoxModalTextInput}
              value={curBoxInitial}
            />
          </View>
          <View style={[styles.horizontalButtonContainer, { marginTop: -15 }]}>
            <Button
              mode="contained-tonal"
              icon="barcode-scan"
              labelStyle={styles.bigButtonLabelStyle} // contentStyle={{fontSize: 20}}
              style={[styles.horizontalButton, styles.bigButtonStyle]}
              onPress={() => navigation.navigate("BarcodeScreen")}
            >
              Barcode Scan
            </Button>
            <Button
              mode="contained-tonal"
              icon="magnify" //disabled
              labelStyle={styles.bigButtonLabelStyle} // contentStyle={{fontSize: 20}}
              style={[styles.horizontalButton, styles.bigButtonStyle]}
              onPress={() => clickManualBarcodeButton()}
            >
              Manual Input
            </Button>
            <Button
              mode="contained-tonal"
              icon="plus" disabled
              labelStyle={styles.bigButtonLabelStyle} // contentStyle={{fontSize: 20}}
              style={[styles.horizontalButton, styles.bigButtonStyle]}
              onPress={() => handleNewItemBtn()}
            >
              New Item
            </Button>
          </View>

          {curBoxItems.length === 0 ? (
            <NoElemComp targetString="Item" />
          ) : (
            curBoxItems.map((elem, idx) => (
              <ItemListElem
                elem={elem}
                id={`key-${idx}`}
                key={`key-${idx}`}
                route={route}
                navigation={navigation}
                onDuplicate={() => handleDuplicate(idx)}
              />
            ))
          )}
          <View
            style={[
              styles.horizontalButtonContainer,
              { justifyContent: "center" },
            ]}
          >
            <Button
              icon="content-save"
              mode="contained-tonal"
              labelStyle={styles.bigButtonLabelStyle}
              style={[styles.bigButtonStyle, { width: "95%", marginTop: 10 }]}
              disabled={shouldDisableSaveBtn()}
              onPress={() => saveBoxItemsList()}
            >
              SAVE
            </Button>
          </View>
          <Dialog
            visible={visibleManualDialog}
            onDismiss={hideManualDialog}
            style={{ padding: 15, marginTop: '-30%' }}
          >
            <Dialog.Content>
              <View style={stylesForBarcode.barcodeDialogStyle}>
                <Text style={stylesForBarcode.barcodeDialogMessageStyle}>
                  Enter the barcode to lookup{" "}
                </Text>
                
                <View style={{ justifyContent: "center", flexDirection: "row", width: '100%',
                    justifyContent: "space-between",alignItems: "center" }}>
                  <TextInput textColor="#333"
                      style={[styles.addNewBoxModalTextInput, { width: '65%'}]}
                      value={textForLookupBarcode}
                      onChangeText={handleBarcodeLookupTextChange}
                      placeholder="Enter a barcode"
                  />
                  <Button
                    icon="magnify"
                    mode="contained-tonal"
                    labelStyle={styles.bigButtonLabelStyle}
                    style={[styles.bigButtonStyle, { width: '30%' }]}
                    onPress={() => lookupBarcodeBtnHandler()}
                    disabled={textForLookupBarcode === ''}
                  >
                    LOOKUP
                  </Button>
                </View>
                
                {  lookupResultMessage === '' ? null :
                  <Text style={[stylesForBarcode.barcodeDialogBarcodeTextStyle, 
                    { marginTop: 20, marginBottom: -20, lineHeight: 50 }]}>
                    { lookupResultMessage }
                  </Text>
                }
              </View>
            </Dialog.Content>
            <Dialog.Actions style={{ marginRight: 10 }}>
              <Button
                icon="window-close"
                mode="contained-tonal"
                labelStyle={styles.bigButtonLabelStyle}
                style={[styles.bigButtonStyle, { margin: 20, width: "45%" }]}
                onPress={() => hideManualDialog()}
              >Cancel
              </Button>
              <Button
                icon="check-bold"
                mode="contained-tonal"
                labelStyle={styles.bigButtonLabelStyle}
                style={[styles.bigButtonStyle, { margin: 20, width: "45%" }]}
                onPress={onAcceptFoundBarcode}
                disabled={textForLookupBarcode !== '' && !receivedLookupItem}
              >
                Accept
              </Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog style={{ padding: 15, marginTop: '-30%' }}
            visible={visibleBackBtnDialog} onDismiss={hideBackBtnWarningDialog}>
            <Dialog.Title style={{ marginTop: 40, marginLeft: 40, paddingTop: 20 }}>
              <Icon source="alert-circle-outline" color={'#cf2900'} size={35} />
              <Text style={[stylesForBarcode.barcodeDialogMessageStyle, 
                { fontSize: 35, padding: 0, marginTop: 20, marginLeft: 50 }]}>{` `}
                <Text style={{color: '#cf2900'}}>SAVE</Text> the changes before leaving?
              </Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text style={{ fontSize: 30, marginLeft: 20, color: '#777' }}>* Unsaved data will be lost</Text>
            </Dialog.Content>
            <Dialog.Actions style={{ marginRight: 10 }}>
              <Button 
                icon="window-close"
                mode="contained-tonal"
                labelStyle={styles.bigButtonLabelStyle}
                style={[styles.bigButtonStyle, { margin: 20, width: "45%" }]}
                onPress={hideBackBtnWarningDialog}>CANCEL
              </Button>
              <Button 
                icon="check-bold"
                mode="contained-tonal"
                labelStyle={styles.bigButtonLabelStyle}
                style={[styles.bigButtonStyle, { margin: 20, width: "45%" }]}
                onPress={() => { // saveBoxItemsList(); 
                  dispatch(setBoxItems([]));
                  navigation.goBack();}
                }
              >NO SAVE & GO BACK</Button>
            </Dialog.Actions>
          </Dialog>
        </View>
      </ScrollView>
    </>
  );
};

export default ItemListScreen;
