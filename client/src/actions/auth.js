// Code taken from https://itnext.io/firebase-login-functionality-from-scratch-with-react-redux-2bf316e5820f

const myFirebaseConfig = require('../firebase/fireBaseConfig');

const { myFirebase } = myFirebaseConfig;

const createUser = (email, password) => {
  // dispatch(requestCreate());
  console.log(email, password);
  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // User signed in, proceed
      console.log(user);
      // dispatch(receiveLogin(user));
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      // dispatch(createError());
    });
};

const loginUser = (email, password) => {
  // dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(`loggedin${user.email}`);
      // dispatch(receiveLogin(user));
    })
    .catch((error) => {
      // Handle error
      console.log(error);
      // dispatch(loginError());
    });
};

const logoutUser = () => {
  // dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      console.log('logged out');
      // dispatch(receiveLogout());
    })
    .catch((error) => {
      // Handle error
      console.log(error);
      // dispatch(logoutError());
    });
};

const verifyAuth = () => {
  // dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      // dispatch(receiveLogin(user));
      console.log('logged in');
    } else {
      console.log('logged out');
    }
    // dispatch(verifySuccess());
  });
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  verifyAuth,
};
