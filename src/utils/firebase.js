import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { myFirebaseConfig } from './../../credentials'

const firebaseConfig = myFirebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, db, auth };



// TODO: DEPLOY YOUR APP (HOSTING)
// https://firebase.google.com/docs/hosting/quickstart?hl=en&authuser=0&_gl=1*mrd6n5*_ga*MzMwNDU2NDc2LjE2OTgxNzYyNzk.*_ga_CW55HF8NVT*MTY5OTg4NjkwMi4zNi4wLjE2OTk4ODY5MDIuNjAuMC4w

// 1. Sign in to Google
// To deploy now, open a terminal window, then navigate to or create a root directory for your web app.
// $ firebase login

// 2. Initialize your project
// Run this command from your app's root directory
// $ firebase init

// 3. When you're ready, deploy your web app
// Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:
// $ firebase deploy

// 4. Check at your firebase
// After deploying, view your app at kkotnj-inventory-project.web.app
