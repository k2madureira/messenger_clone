import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBZ1VHSlzV1zIPcur_lKuEpvTYJTh8l7gs",
  authDomain: "message-clone-5e22a.firebaseapp.com",
  databaseURL: "https://message-clone-5e22a.firebaseio.com",
  projectId: "message-clone-5e22a",
  storageBucket: "message-clone-5e22a.appspot.com",
  messagingSenderId: "576460509666",
    appId: "1:576460509666:web:7864bc49049df8c15169bb"
});


const bd = firebaseApp.firestore();

export { bd };