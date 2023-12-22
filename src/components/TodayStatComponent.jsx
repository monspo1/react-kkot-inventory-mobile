import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";
import { Avatar, Card, Portal, Modal, Text, } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { getTodayString } from '../utils/helper';
import customStyles from "../styles/customStyles";


const TodayStatComponent = (props) => {
  const [date, setDate] = React.useState(undefined);
  const [openDatePickerModal, setOpenDatePickerModal] = React.useState(false);
  const styles = customStyles();
  const boxesData = useSelector(state => state.boxesData);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    let tempItemCount = 0;
    let tempWeight = 0;
    boxesData.forEach(box => {
      tempItemCount += box.items_count;
      tempWeight += Number(box.items_weight);
    })
    setTotalItemsCount(tempItemCount)
    setTotalWeight(Math.round(tempWeight*100)/100)

  }, [boxesData]);

  const validRange = useMemo(() => {
    return { startDate: new Date(0), endDate: new Date() };
  }, []);

  const onDismissSingle = React.useCallback(() => {
    setOpenDatePickerModal(false);
  }, [setOpenDatePickerModal]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpenDatePickerModal(false);
      setDate(params.date);
    },
    [setOpenDatePickerModal, setDate]
  );

  // const getTodayString = () => {
  //   const today = new Date();
  //   var year = today.getFullYear();

  //   var month = (1 + today.getMonth()).toString();
  //   month = month.length > 1 ? month : "0" + month;

  //   var day = today.getDate().toString();
  //   day = day.length > 1 ? day : "0" + day;

  //   return month + "/" + day + "/" + year;
  // };


  return(<>
    <View style={styles.containerForTodayWorkSummary}>
      {/* <Card.Title
        style={styles.todayStatStyle}
        title="Today's Stat"
        titleStyle={{ fontSize: 40, lineHeight: 45, marginBottom: 10 }} 
        subtitle={
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>
                ● Selected Date:{" "}
              </Text>
              {date ? date.toLocaleDateString('en-US') : getTodayString()}
            </Text>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>● Total Boxes: </Text>
              {(4 + boxesData.length)}
            </Text>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>● Total Items: </Text>
              {30 + totalItemsCount}
            </Text>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>
                ● Total Weights:{" "}
              </Text>
              {117.26 + totalWeight}
            </Text>
          </View>
        }
        right={() => (
          <Avatar.Icon size={100} icon="finance" // finance chart-bar
            style={{ marginRight: 30 }} backgroundColor={"#7da82c"}
          />
        )}
      /> */}
      <Card style={styles.todayStatStyle}>
      <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 40, lineHeight: 45, marginBottom: 10 }}>Today's Stat</Text>
          <View style={{ marginLeft: 20, }}>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>
                ● Selected Date:{" "}
              </Text>
              {date ? date.toLocaleDateString('en-US') : getTodayString()}
            </Text>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>● Total Boxes: </Text>
              {(4 + boxesData.length)}
            </Text>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>● Total Items: </Text>
              {30 + totalItemsCount}
            </Text>
            <Text style={styles.coloredBulletPointWrapper}>
              <Text style={styles.coloredBulletPoint}>
                ● Total Weights:{" "}
              </Text>
              {117.26 + Number(totalWeight)}
            </Text>
          </View>
        </View>
        <Avatar.Icon size={100} icon="finance" style={{ marginRight: 30 }} backgroundColor={"#7da82c"} />
      </Card.Content>
    </Card>
    </View>
    <Portal>
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
    </Portal>
  </>)
}

export default TodayStatComponent;