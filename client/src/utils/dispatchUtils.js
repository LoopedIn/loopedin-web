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

export const USER_FRIENDS_LOADED = "USER_FRIENDS_LOADED";
export const USER_POSTS_LOADED = "USER_POSTS_LOADED";

export const ADD_USER_SUCESS = "ADD_USER_SUCESS";
export const ADD_USER_FAILED = "ADD_USER_FAILED";

export const CREATE_LOOP_SUCCESSFUL = "CREATE_LOOP_SUCCESSFUL";
export const CREATE_LOOP_FAILED = "CREATE_LOOP_FAILED";

export const USER_LOOPS_LOADED = "USER_LOOPS_LOADED";
export const LOOPS_LIST_LOADED = "LOOPS_LIST_LOADED";
export const LOOP_CONFIG_UPDATED = "LOOP_CONFIG_UPDATED";

export const CHAT_HISTORY_LOADED = "CHAT_HISTORY_LOADED";
export const SENT_MESSAGE = "SENT_MESSAGE";
export const FRIEND_SELECTED = "FRIEND_SELECTED";
export const RECENT_CHATS_LOADED = "RECENT_CHATS_LOADED";

export const REMOVE_USER_CONNECTION_TOASTS = "REMOVE_USER_CONNECTION_TOASTS";
export const REMOVE_REGISTER_TOAST = "REMOVE_REGISTER_TOAST";
export const REMOVE_LOGIN_TOAST = "REMOVE_LOGIN_TOAST";

export const dispatches = {
  auth: {
    requestLogin: () => {
      return {
        type: LOGIN_REQUEST
      };
    },
    receiveLogin: (user, firebaseUser) => {
      return {
        type: LOGIN_SUCCESS,
        user,
        firebaseUser
      };
    },
    loginError: () => {
      return {
        type: LOGIN_FAILURE
      };
    },
    requestLogout: () => {
      return {
        type: LOGOUT_REQUEST
      };
    },
    receiveLogout: () => {
      return {
        type: LOGOUT_SUCCESS
      };
    },
    logoutError: () => {
      return {
        type: LOGOUT_FAILURE
      };
    },
    verifyRequest: () => {
      return {
        type: VERIFY_REQUEST
      };
    },
    verifySuccess: () => {
      return {
        type: VERIFY_SUCCESS
      };
    },
    registerSuccess: user => {
      return {
        type: REGISTER_SUCCESS,
        user
      };
    },
    registerFailure: error => {
      return {
        type: REGISTER_FAILURE,
        error
      };
    },
    removeRegisterToastMessage: () => {
      return{
        type: REMOVE_REGISTER_TOAST
      }
    },
    removeLoginToastMessage :() =>{
      return{
        type: REMOVE_LOGIN_TOAST
      }
    }
  },

  //TODO: The functions above are not used, need to refactor
  user: {
    userFriendsLoaded: userFriends => {
      return {
        type: USER_FRIENDS_LOADED,
        userFriends
      };
    },
    userLoopsLoaded: (userLoops, friendsList) => {
      return {
        type: USER_LOOPS_LOADED,
        userLoops,
        friendsList
      };
    },
    addUserSuccess: msg => {
      return {
        type: ADD_USER_SUCESS,
        msg
      };
    },
    addUserFailed: errorMsg => {
      return {
        type: ADD_USER_FAILED,
        errorMsg
      };
    },
    removeToastMessages:  () => {
      return {
        type: REMOVE_USER_CONNECTION_TOASTS
      }
    }
  },

  loop: {
    createLoopSuccess: msg => {
      return {
        type: CREATE_LOOP_SUCCESSFUL,
        msg
      };
    },

    createLoopFailed: msg => {
      return {
        type: CREATE_LOOP_FAILED,
        msg
      };
    },

    getLoopListsSuccess: loopLists => {
      return {
        type: LOOPS_LIST_LOADED,
        loopLists
      };
    },
    loopConfigurationsSaved: msg => {
      return{
        type: LOOP_CONFIG_UPDATED,
        msg
      }
    }
  },

  directMessages: {
    chatHistoryLoaded: msg => {
      return {
        type: CHAT_HISTORY_LOADED,
        msg
      }
    },
    sentMessage: msg => {
      return {
        type: SENT_MESSAGE,
        msg
      }
    },
    friendSelected : msg => {
      return{
        type: FRIEND_SELECTED,
        msg
      }
    },
    recentChatsLoaded : msg => {
      return{
        type: RECENT_CHATS_LOADED,
        msg
      }
    }
  }
};
