import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as Google from 'expo-auth-session/providers/google';
import { auth, signInWithCredential, GoogleAuthProvider } from "../utils/firebase";
import { View } from 'react-native'
import { Button } from 'react-native-paper';
import  { myGoogleConfig } from './../../credentials'
// import { setCurLoggedInUser } from './../actions/action'

function GoogleLogin(props) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: myGoogleConfig.clientId,
  });

  const dispatch = useDispatch()

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          // console.log('result: ', result)
          // const { email, uid, displayName, photoURL } = result.user;
          // const loggedInUser = { email, uid, displayName, photoURL };

          // dispatch(setCurLoggedInUser(loggedInUser));
          // navigation.navigate('HomeScreen')
          setLoginResMsg(`Welcome ${JSON.stringify(result.user.email)}`)
        }).catch((error) => {
          console.log('error2: ', error)
          setLoginResMsg(JSON.stringify(error))
        });
    }
  }, [response]);

  return (
    <View style={{ marginTop: 10}}>
      <Button mode="contained" onPress={() => promptAsync()}>
        Sign in with Google
      </Button>
    </View>
  );
}

export default GoogleLogin;