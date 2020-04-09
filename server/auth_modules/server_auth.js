const admin = require('firebase-admin');
const { User } = require('../models/user.js');

const serviceAccount = process.env.FIREBASE_PRIVATE_KEY
  ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
  : require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loopedin-269607.firebaseio.com',
});

async function tokenIdToDbUser(tokenUid) {
  return await User.findOne({ authToken: tokenUid });
}

const firebaseTokenAuthenticator = async (req, res, next) => {
  const user = await User.findOne({
    authToken: 'RmxDKbdPqtafoFPqxljZCJfMAAn1',
  });
  req.body.userID = user._id;
  req.body.userId = user._id;
  req.body.user = user;
  next();
  // if (req.body.idToken) {
  //    admin.auth().verifyIdToken(req.body.idToken)
  //     .then(async (decodedToken) => {
  //       const user = await tokenIdToDbUser(decodedToken.uid);
  //       req.body.userID = user._id
  //       req.body.user = user
  //       next()
  //     }).catch(() => {
  //       res.status(403);
  //     });
  // } else {
  //   res.status(403).send();
  // }
};

module.exports = { firebaseTokenAuthenticator };
