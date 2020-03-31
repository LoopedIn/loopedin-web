import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6TeyOiJlhVEtjjqkAnJ2-8Z6N8wT9E8k",
  authDomain: "loopedinauth.firebaseapp.com",
  databaseURL: "https://loopedinauth.firebaseio.com",
  projectId: "loopedinauth",
  storageBucket: "loopedinauth.appspot.com",
  messagingSenderId: "660168003334",
  appId: "1:660168003334:web:8ce7ed9ea45aed347c9887",
  measurementId: "G-RWPPQQFLE5"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
myFirebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
const baseDb = myFirebase.firestore();
export const db = baseDb;
