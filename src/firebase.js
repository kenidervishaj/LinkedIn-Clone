import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD2H7qf-_quOR5SltsD8UxgJMMrd8dCZsk",
  authDomain: "linkedin-clone-6dbc2.firebaseapp.com",
  projectId: "linkedin-clone-6dbc2",
  storageBucket: "linkedin-clone-6dbc2.appspot.com",
  messagingSenderId: "417227882924",
  appId: "1:417227882924:web:880e679e4add5bc0397a09"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export{ db, auth };