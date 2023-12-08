import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image } from 'react-native';
import { ActivityIndicator, Button, TextInput, Text, HelperText } from 'react-native-paper';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { setLoaderStatus, setCurLoggedInUser } from './../actions/action' // , 
import customStyles from '../styles/customStyles' 
// import GoogleLogin from "../utils/GoogleLogin";

const LoginScreen = ({ route, navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginResMsg, setLoginResMsg] = useState('');
    const [isSecureText, setIsSecureText] = useState(true);
    const [loginSuccess, setLoginSuccess] = useState(false);
    // const spinner = useSelector(state => state.loading);
    // const windowWidth = useWindowDimensions().width;
    const styles = customStyles();
    const dispatch = useDispatch()
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate('HomeScreen')
        }
      });
      return () => unsubscribe();
    }, []);

    const handleEmailChange = (email) => {
      setEmail(email);
      setEmailError(!emailRegex.test(email));
      setLoginResMsg('')
    };

    const handleLogin = () => {
      if(!emailError && !passwordError){
        dispatch(setLoaderStatus(true));
        signInWithEmailAndPassword(auth, email, password)
          .then((result) => {
            // console.log('result: ', result)
            // setLoginSuccess(true)
            const { email, uid, displayName, photoURL } = result.user;
            const loggedInUser = { email, uid, displayName, photoURL };
            // dispatch(setCurLoggedInUser(loggedInUser));
            dispatch(setLoaderStatus(false));
            // navigation.navigate('HomeScreen')
            navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }], });

            setLoginResMsg(`Welcome ${JSON.stringify(result?.user?.email)}`)
          }).catch((error) => {
            console.log('error: ', error)
            dispatch(setLoaderStatus(false));
            setLoginResMsg(JSON.stringify(error))
          });
      }
    }

    const socialLogout = async () => {
      signOut(auth)
        .then(() => {
          console.log('User signed out');
          dispatch(setLoaderStatus(false));
        }).catch((error) => {
          console.log('error: ', error)
          dispatch(setLoaderStatus(false));
        });
    }

    const toggleSecureText = () => {
      setIsSecureText(!isSecureText)
    }

    const shouldDisableLoginBtn = () => {
      return !(email !== "" && password !== "" && emailError === false && passwordError === false)
    }


    return (<>
      <ActivityIndicator
        animating={spinner}
        hidesWhenStopped={true}
        style={{ position: "absolute", top: "40%", left: "50%", zIndex: 20 }}
        size="large"
      />
        <View style={styles.centeredContainer}>
            <Image style={styles.kkotLogoStyle}
              source={require('../../assets/images/njkkot_logo.png')}
            />
            {/* <Text variant="displaySmall">NJ Kkot Inventory Sign In</Text> */}
            <View style={styles.loginTextInputContainer}>
              <TextInput
                mode="outlined"
                label="Email"
                value={email}
                error={emailError}
                onChangeText={email => handleEmailChange(email)}
                style={[styles.bigTextInputStyle, { marginTop: 40 }]} 
                placeholder="Type valid email address "
              />
              <HelperText type="error" visible={emailError }style={styles.addNewBoxModalErrorMessage} >
                Email address is NOT valid!
              </HelperText>

              <TextInput 
                mode="outlined"
                label="Password"
                secureTextEntry={isSecureText}
                value={password}
                onChangeText={password => setPassword(password)}
                placeholder="Type your password"
                style={[styles.bigTextInputStyle, { marginTop: 20 }]} 
                right={ <TextInput.Icon icon={isSecureText ? "eye" : "eye-off"}
                  onPress={toggleSecureText} style={{ marginTop: 15}}/>
                }
              />
            </View>

            <View style={[styles.bigButtonLabelStyle, { marginTop: 30, width: '90%' }]}>
              <Button icon="login" mode="contained" labelStyle={styles.bigButtonLabelStyle}
                style={[styles.bigButtonStyle, { margin: 20 }]} disabled={shouldDisableLoginBtn()} 
                onPress={handleLogin}>
                Login
              </Button>
              <Button icon="logout" mode="contained" labelStyle={styles.bigButtonLabelStyle}
                style={[styles.bigButtonStyle, { margin: 20 }]} disabled={false} 
                onPress={socialLogout}>
                Logout
              </Button>
            </View>
            <View>
              <Text variant="headlineMedium">{loginResMsg}</Text>
            </View>
        </View>
    </>);
}

export default LoginScreen;