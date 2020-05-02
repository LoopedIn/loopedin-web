import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from "../actions/";

import { REMOVE_REGISTER_TOAST } from "../utils/dispatchUtils";

const initialState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  loginError: false,
  logoutError: false,
  isAuthenticated: false,
  registerError: false,
  registerSuccess: false,
  user: {},
  registerToast: "",
  loginToast: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
        firebaseUser: action.firebaseUser
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
        loginToast: action.msg
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
        firebaseUser: {},
        registerToast: "",
        loginToast: ""
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
        registerError: false,
        isAuthenticated: true,
        registerToast: "Succesfully registered",
        user: action.user
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registerSuccess: false,
        registerError: true,
        registerToast: action.error.message
      };
    case REMOVE_REGISTER_TOAST: {
      return {
        ...state,
        registerToast: ""
      };
    }
    default:
      return state;
  }
};
