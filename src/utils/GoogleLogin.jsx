import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { setCurLoggedInUser } from './../actions/action'
import * as Google from 'expo-auth-session/providers/google';
import { auth, signInWithCredential, GoogleAuthProvider } from "../utils/firebase";
import { View } from 'react-native'
import { Button } from 'react-native-paper';
// import firebase from 'firebase';
// import GoogleIcon from '@mui/icons-material/Google';

function GoogleLogin(props) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '510365340491-5p05hhoiib5cnm5enm7ln9mmo3abej1p.apps.googleusercontent.com',
  });

  const dispatch = useDispatch()

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((result) => {
          console.log('result: ', result)
          const { email, uid, displayName, photoURL } = result.user;
          const loggedInUser = { email, uid, displayName, photoURL };

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