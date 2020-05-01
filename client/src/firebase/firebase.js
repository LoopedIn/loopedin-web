import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7IYES3jUgEZdYtUYIjQydZQBrFDAVFFE",
  authDomain: "looped-in-274723.firebaseapp.com",
  databaseURL: "https://looped-in-274723.firebaseio.com",
  projectId: "looped-in-274723",
  storageBucket: "looped-in-274723.appspot.com",
  messagingSenderId: "390540936470",
  appId: "1:390540936470:web:300e311ca95c657c907c37",
  measurementId: "G-8RZ5GK2XFL"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
myFirebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const baseDb = myFirebase.firestore();
export const db = baseDb;
