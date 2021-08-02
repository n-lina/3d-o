//firebase.js
import firebase from "firebase/app"
import "firebase/firestore"


const firebaseConfig = {
    // apiKey: "AIzaSyB-6pGJKIGCZZ_32fZxXQka3xq7sDJA0Xo",
    // authDomain: "d-o-1c698.firebaseapp.com",
    // projectId: "d-o-1c698",
    // storageBucket: "d-o-1c698.appspot.com",
    // messagingSenderId: "1024437613893",
    // appId: "1:1024437613893:web:aeae9e58b460441b6aba2c",
    // measurementId: "G-ZMEZJBMKCV",
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,
  };
  firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore()
  export default firebase
