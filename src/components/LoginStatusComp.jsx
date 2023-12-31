import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import customStyles from "../styles/customStyles";
import { useNavigation } from '@react-navigation/native';

const LoginStatusComp = () => {
  const styles = customStyles();
  const [curLoggedinUser, setCurLoggedinUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurLoggedinUser(user);
      } else {
        setCurLoggedinUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        setCurLoggedinUser(null);
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={styles.welcomeUserContainer}>
      <Text variant="headlineMedium">{ curLoggedinUser ? `Welcome ${curLoggedinUser.email}` : 'Not logged in' }</Text> 
      { curLoggedinUser ?
        <Button mode="outlined" onPress={handleLogout} style={[{ width: '15%', marginRight: 35 }]}>Logout</Button>:
        <Button mode="outlined" onPress={handleLogin} style={[{ width: '15%', marginRight: 35 }]}>Login</Button>
      }
    </View>
  )
}

export default LoginStatusComp;