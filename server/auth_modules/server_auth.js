const admin = require('firebase-admin');

const serviceAccount = process.env.FIREBASE_PRIVATE_KEY;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loopedin-269607.firebaseio.com"
});

const tokenIdToDbUserIdConverter = (tokenUid) =>{
  return tokenUid;
}

const firebaseTokenAuthenticator = (req, res, next) => {
  if (req.body.idToken) {
    admin.auth().verifyIdToken(req.body.idToken)
      .then((decodedToken) => {
        console.log(decodedToken);
        next();
      }).catch(() => {
        res.status(403).send('Unauthorized');
      });
  } else {
    res.status(403).send('Unauthorized');
  }
}

module.exports = {firebaseTokenAuthenticator};