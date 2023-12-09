import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";

export default function customStyles() {
  let windowWidth = useWindowDimensions().width;
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "stretch",
    },
    scrollViewContainer: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "stretch",
      // backgroundColor: "orange",
    },
    viewContainer: {
      minHeight: Dimensions.get("window").height, // 추가된 코드
      // backgroundColor: "orange", // 테스트
    },
    centeredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: -50,
    },
    loginTextInputContainer: {
      width: "90%",
      marginLeft: 10,
      marginRight: 10,
    },
    kkotLogoStyle: {
      marginBottom: 35,
      width: 150,
      height: 150,
      resizeMode: "stretch",
    },
    welcomeUserContainer: {
      marginLeft: 20,
      marginTop: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    horizontalButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      padding: 20,
    },
    horizontalButton: {
      flex: 1,
      margin: 10,
    },
    noBoxDataStyle: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: 70,
      marginBottom: 70,
    },
    noBoxDataFontStyle: {
      fontSize: 25,
      color: "#777",
    },
    containerForTodayWorkSummary: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch",
      marginTop: 10,
      marginBottom: 25,
    },
    boxListContainer: {
      width: "100%",
      marginLeft: 30,
    },
    dateText: {
      marginLeft: 30,
      fontSize: windowWidth * 0.05, // 화면 넓이의 5%에 해당하는 크기로 설정
    },
    todayStatStyle: {
      backgroundColor: "#dbf77e",
      borderRadius: 20,
      padding: 15,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
    },
    coloredBulletPointWrapper: {
      fontSize: 23,
      lineHeight: 40,
      flexDirection: "row",
      alignItems: "center",
      color: "#2981c4",
    },
    coloredBulletPoint: {
      fontSize: 23,
      lineHeight: 40,
      color: "#455c5c",
    },
    fabStyle: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
    itemDetailInputs: {
      margin: 20,
    },
    fabStyle: {
      position: "absolute",
      margin: 16,
      right: 30,
      bottom: 30,
    },
    modalContainer: {
      backgroundColor: "white",
      padding: 20,
    },
    addNewBoxModalContainer: {
      backgroundColor: "white",
      padding: 20,
      marginLeft: 30,
      marginRight: 30,
    },
    addNewBoxModalTextInput: {
      margin: 20,
      fontSize: 30,
      height: 70,
    },
    bigTextInputStyle: {
      margin: 20,
      fontSize: 30,
      height: 70,
    },
    addNewBoxModalErrorMessage: {
      marginLeft: 25,
      marginTop: -15,
      fontSize: 20,
      lineHeight: 25,
    },
    scanButtonStyle: {
      width: "30%",
      position: "absolute",
      right: 0,
      marginRight: 30,
      height: 80,
      justifyContent: "center",
    },
    bigButtonStyle: {
      height: 80,
      justifyContent: "center",
    },
    bigButtonLabelStyle: {
      fontSize: 24,
      lineHeight: 35,
    },
    itemDetailHeadline: {
      fontSize: 25,
      fontWeight: 700,
      color: theme.colors.primary,
      marginLeft: 25,
      marginBottom: -15,
    },
    itemCategoryRadioStyle: {
      width: "90%",
      alignSelf: "center",
    },
    itemCategoryRadioLabelStyle: {
      fontSize: 25,
      borderRadius: 5,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 1,
      paddingBottom: 3,
    },
    itemDetailHelperTextStyle: {
      marginLeft: 25,
      marginTop: -15,
      fontSize: 20,
    },
  });

  return styles;
}
