const admin = require('firebase-admin');
const { User } = require('../models/user.js');

const serviceAccount = process.env.FIREBASE_PRIVATE_KEY
  ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
  : require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://looped-in-274723.firebaseio.com/',
});

async function tokenIdToDbUser(tokenUid) {
  return await User.findOne({ authToken: tokenUid });
}

const firebaseTokenAuthenticator = async (req, res, next) => {
  const apiTestingLoggedInUser = req.body.loggedInUser;
  if (apiTestingLoggedInUser) {
    const user = await User.findOne({ userName: apiTestingLoggedInUser });
    req.body.userID = user._id;
    req.body.user = user;
    next();
  } else {
    if (req.body.idToken) {
      admin
        .auth()
        .verifyIdToken(req.body.idToken)
        .then(async (decodedToken) => {
          const user = await tokenIdToDbUser(decodedToken.uid);
          req.body.userID = user._id;
          req.body.user = user;
          next();
        })
        .catch((err) => {
          console.log(err);
          res.status(403).send(err);
        });
    } else {
      res.status(403).send(req.body);
    }
  }
};

module.exports = { firebaseTokenAuthenticator };
