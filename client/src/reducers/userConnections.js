import {
  USER_FRIENDS_LOADED,
  ADD_USER_SUCESS,
  ADD_USER_FAILED,
  USER_LOOPS_LOADED,
  CREATE_LOOP_SUCCESSFUL,
  CREATE_LOOP_FAILED,
  LOOPS_LIST_LOADED,
  REMOVE_USER_CONNECTION_TOASTS,
  LOOP_CONFIG_UPDATED,
  MY_POSTS_LOADED
} from "../utils/dispatchUtils";

import { LOGOUT_SUCCESS } from "../actions";

const initialState = {
  userLoops: [],
  userFriends: [],
  loopLists: [],
  toastMessages: [],
  addFriendToUserActionMsg: "",
  createLoopFailedMsg: "",
  createLoopSuccessFulMsg: "",
  postsLists: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_FRIENDS_LOADED:
      return { ...state, userFriends: action.userFriends };
    case USER_LOOPS_LOADED:
      return {
        ...state,
        userLoops: action.userLoops,
        friendsList: action.friendsList
      };
    case ADD_USER_SUCESS:
      return {
        ...state,
        toastMessages: updatedToastMessages(state, action.msg)
      };
    case ADD_USER_FAILED:
      return {
        ...state,
        toastMessages: updatedToastMessages(state, action.errorMsg)
      };
    case CREATE_LOOP_SUCCESSFUL:
      return {
        ...state,
        toastMessages: updatedToastMessages(state, action.msg)
      };
    case CREATE_LOOP_FAILED:
      return {
        ...state,
        toastMessages: updatedToastMessages(state, action.msg)
      };
    case LOOP_CONFIG_UPDATED:
      return {
        ...state,
        toastMessages: updatedToastMessages(state, action.msg)
      };
    case LOOPS_LIST_LOADED:
      return { ...state, loopLists: action.loopLists };
    case MY_POSTS_LOADED:
      return { ...state, postsLists: action.postsLists };
    case REMOVE_USER_CONNECTION_TOASTS:
      return { ...state, toastMessages: [] };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userLoops: [],
        userFriends: [],
        loopLists: [],
        toastMessages: [],
        addFriendToUserActionMsg: "",
        createLoopFailedMsg: "",
        createLoopSuccessFulMsg: "",
        postsLists: [],
        friendsList: []
      };
    default:
      return state;
  }
};

const updatedToastMessages = (state, newMessage) => {
  const newToastMessages = state.toastMessages? [...state.toastMessages, newMessage] : [newMessage];
  return newToastMessages;
};
