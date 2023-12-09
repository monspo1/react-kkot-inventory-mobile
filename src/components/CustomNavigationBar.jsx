import { Appbar, Text, useTheme } from 'react-native-paper';
// import LoginStatusComp from './LoginStatusComp';
// import { getHeaderTitle } from '@react-navigation/elements';

export default function CustomNavigationBar({ navigation, route, options, back }) {
  const theme = useTheme();
  // const title = getHeaderTitle(options, route.name);
  const title = options.headerTitle;

  return ( 
    <Appbar.Header style={{ 
      backgroundColor: '#3b58ad'
    }}> 
      { back ? <Appbar.BackAction onPress={navigation.goBack} /> : null }
      <Appbar.Content title={title} titleStyle={{ color: 'white',
        fontSize: 30 }} /> 

      {/* Only showing the title without back arrow */}
      {/* <Appbar.Content title={title} titleStyle={{ color: 'white',
        fontSize: 30 }} /> */}
    </Appbar.Header>
  );
}

