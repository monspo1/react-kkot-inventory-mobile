import React, { useState } from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { registerTranslation } from "react-native-paper-dates";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ItemListScreen from "./src/screens/ItemListScreen";
import ItemDetailScreen from "./src/screens/ItemDetailScreen";
import CustomNavigationBar from "./src/components/CustomNavigationBar";
import store from "./src/store/store";
import { customTheme1, customTheme2, customTheme3, customTheme4, customTheme5Light,
  MaterialDarkTheme, MaterialLightTheme,
} from './src/styles/customTheme';

registerTranslation("en", {
  save: "Save",
  selectSingle: "Select date",
  selectMultiple: "Select dates",
  selectRange: "Select period",
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later than ${date}`,
  mustBeLowerThan: (date) => `Must be earlier than ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Previous",
  next: "Next",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Pick date from calendar",
  close: "Close",
});

const Stack = createStackNavigator();

const App = () => {
  return (<>
      <StoreProvider store={store}>
        <PaperProvider 
          theme={MaterialLightTheme}
        >
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="LoginScreen"
              // initialRouteName="HomeScreen" // for Testing
              // initialRouteName="ItemListScreen" // for Testing
              // initialRouteName="ItemDetailScreen" // for Testing
              screenOptions={{ header: (props) => <CustomNavigationBar {...props} /> }}
            >
              <Stack.Screen name="LoginScreen" options={{ headerTitle: 'Log In' }} component={LoginScreen} />
              <Stack.Screen name="HomeScreen" options={{ headerTitle: 'Boxes' }} component={HomeScreen} />
              <Stack.Screen name="ItemListScreen"  options={{ headerTitle: "Items" }} component={ItemListScreen} />
              <Stack.Screen name="ItemDetailScreen" options={{ headerTitle: "Details" }}  component={ItemDetailScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </StoreProvider>
  </>);
};

export default App;
