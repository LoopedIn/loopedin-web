const admin = require('firebase-admin');
const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loopedin-269607.firebaseio.com"
});

const tokenIdToDbUserIdConverter = (tokenUid) =>{
  User.find({authToken:tokenUid}, (error,data)=> {
    
    console.log(data)
    return data._id;
  })
}

const firebaseTokenAuthenticator = (req, res, next) => {
  next();// TODO : remove
  if (req.body.idToken) {
    admin.auth().verifyIdToken(req.body.idToken)
      .then((decodedToken) => {
       req.body.userID = tokenIdToDbUserIdConverter(decodedToken.uid);
      }).catch(() => {
        res.status(403).send('Unauthorized');
      });
  } else {
    res.status(403).send('Unauthorized');
  }
}

module.exports = {firebaseTokenAuthenticator};