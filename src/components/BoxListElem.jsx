import React, { useState, } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Text, List, Divider, IconButton, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
// import { setBoxItems } from '../actions/action'
// import { getRandomColor, getCategoryColors } from '../utils/helper';
import customStyles from "../styles/customStyles";
import moment from 'moment';
import { tempDataForBoxList, boxInitialColors } from "../constants/constants";
const BoxListElem  = ({elem, idx, navigation}) => {
  // const dispatch = useDispatch()
  // const boxesData = useSelector(state => state.boxesData);
  const windowWidth = useWindowDimensions().width;
  const styles = customStyles();

  const getBoxInitialBackgroundColor = () => {
    return boxInitialColors[ Math.floor(Math.random() * boxInitialColors.length) ]
  }

  const createdAt = moment(elem.updated).format('MM/DD/YYYY, h:mm A');
  const descLocal = `Total: ${elem.items_count} items  | ${elem.items_weight} (lbs)  |  updated: ${createdAt}`;

  return (
    <View key={`box-key-${idx}`} style={{ width: '100%'}}>
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
            backgroundColor={getBoxInitialBackgroundColor().backgroundColor}
          />
        )}
        right={() => (
          <IconButton
            icon="chevron-right"
            size={50}
            onPress={() =>
              navigation?.push("ItemListScreen", { selected: idx })
            }
          />
        )}
        onPress={() =>
          navigation?.push("ItemListScreen", { selected: idx })
        }
      />
      <Divider/>
    </View>
    );
}

export default BoxListElem;