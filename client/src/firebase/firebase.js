import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2yQRZalYfdWRL9dFZMuSrRAAkxYyCEUE",
  authDomain: "loopedin-269607.firebaseapp.com",
  databaseURL: "https://loopedin-269607.firebaseio.com",
  projectId: "loopedin-269607",
  storageBucket: "loopedin-269607.appspot.com",
  messagingSenderId: "547626597392",
  appId: "1:547626597392:web:8e8db58b889a8ffc779e95",
  measurementId: "G-MXT552M6F7"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
