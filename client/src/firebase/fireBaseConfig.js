const firebase = require('firebase/app')

require("firebase/auth")
require("firebase/firestore")

const config = {
  apiKey: 'AIzaSyB2yQRZalYfdWRL9dFZMuSrRAAkxYyCEUE',
  authDomain: 'loopedin-269607.firebaseapp.com',
  databaseURL: 'https://loopedin-269607.firebaseio.com',
  projectId: 'loopedin-269607',
  storageBucket: 'loopedin-269607.appspot.com',
  messagingSenderId: '547626597392',
  appId: '1:547626597392:web:8e8db58b889a8ffc779e95',
  measurementId: 'G-MXT552M6F7',
};

const myFirebase = firebase.initializeApp(config);
const baseDb = myFirebase.firestore();
const db = baseDb;
module.exports = {myFirebase,db}