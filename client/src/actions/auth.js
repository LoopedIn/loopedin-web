import { myFirebase } from "../firebase/firebase";
import { sendAuthenticatedRequest, unAuthenticatedRequest } from  "../utils/requestUtils";
import { createUserApi,
        getCurrentUserApi 
} from "../api/apiRequests";
import { routes } from "../utils/serverRoutes";
import firebase from "firebase/app";
import axios from 'axios';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = (user, firebaseUser) => {
  return {
    type: LOGIN_SUCCESS,
    user,
    firebaseUser
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const registerSuccess = user => {
  return {
    type: REGISTER_SUCCESS,
    user
  };
};

const registerFailure = error => {
  return {
    type: REGISTER_FAILURE,
    error
  };
};

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async firebaseUser => {
      const user = (await getCurrentUserApi()).data
      dispatch(receiveLogin(user, firebaseUser))
    })
    .catch(error => {
      dispatch(loginError());
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(async firebaseUser => {
    if (firebaseUser !== null) {
      const user = (await getCurrentUserApi()).data
      dispatch(receiveLogin(user, firebaseUser))
    }
    dispatch(verifySuccess());
  });
};

export const registerUser = (firstName, lastName, email, password) => dispatch => {
  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response =>  createUserApi(response.user.uid, firstName, firstName,lastName, email)) //TODO: needs username
    .then(response => {
      dispatch(registerSuccess(response));
    })
    .catch(error => {
      dispatch(registerFailure(error));
    });
};