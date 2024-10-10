// Import the necessary functions from Firebase SDK
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzLwAWObIQfrOdCXy9xv0wvOINuftPd10",
  authDomain: "login-6a5bb.firebaseapp.com",
  projectId: "login-6a5bb",
  storageBucket: "login-6a5bb.appspot.com",
  messagingSenderId: "641499876132",
  appId: "1:641499876132:web:cad6773908e3c3c8a4c1b1"
};

// Initialize Firebase app and authentication
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };
