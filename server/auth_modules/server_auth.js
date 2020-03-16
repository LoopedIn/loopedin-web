const admin = require('firebase-admin');
const { User } = require('../models/user.js');
const mongoose = require('mongoose');

const serviceAccount = process.env.FIREBASE_PRIVATE_KEY ?
 JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loopedin-269607.firebaseio.com"
});

function tokenIdToDbUserIdConverter (tokenUid) {
  const userData = User.find({authToken:tokenUid}, (error,data)=> {
    return data;
  })
  const id = mongoose.Types.ObjectId(userData._id);
  return id;
}

const firebaseTokenAuthenticator = (req, res, next) => {
  if (req.body.idToken) {
     admin.auth().verifyIdToken(req.body.idToken)
      .then((decodedToken) => {
       const userId = tokenIdToDbUserIdConverter(decodedToken.uid);
       req.body.userID = userId;
       next();
      }).catch(() => {
        res.status(403);
      });
  } else {
    res.status(403);
  }
}

module.exports = {firebaseTokenAuthenticator};