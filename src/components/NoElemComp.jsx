import React from 'react';
import { View } from 'react-native';
import { Icon, Text} from 'react-native-paper';
import customStyles from "../styles/customStyles";

const NoElemComp = ({ targetString }) => {
  const styles = customStyles();

  return (
    <View style={styles.noBoxDataStyle}>
      <Icon source="tooltip-remove-outline" color={"#ccc"} size={80} />
      <Text style={styles.noBoxDataFontStyle}>{`No ${targetString} yet`}</Text>
    </View>
  )
}

export default NoElemComp;