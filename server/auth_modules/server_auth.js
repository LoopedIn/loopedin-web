const admin = require('firebase-admin');

const serviceAccount = process.env.FIREBASE_PRIVATE_KEY ?
 JSON.parse(process.env.FIREBASE_PRIVATE_KEY) : require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loopedin-269607.firebaseio.com"
});

async function  tokenIdToDbUserIdConverter (tokenUid) {
  return await User.find({authToken:tokenUid}, (error,data)=> {
    console.log("data in db" + data)
    return data._id;
  })
}

const firebaseTokenAuthenticator = (req, res, next) => {
  //next();// TODO : remove

  if (req.body.idToken) {
    console.log(req.body.idToken)
    admin.auth().verifyIdToken(req.body.idToken)
      .then((decodedToken) => {
        console.log (decodedToken.uid) 

       req.body.userID = tokenIdToDbUserIdConverter(decodedToken.uid);
       console.log( req.body.userID )
       next();
      }).catch(() => {
        console.log( req.body.authToken )
        res.status(403);
        
      });
  } else {
    console.log( req.body.authToken )
    res.status(403);
  }
}

module.exports = {firebaseTokenAuthenticator};