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
export const USER_LOOPS_LOADED = "USER_LOOPS_LOADED";
export const USER_POSTS_LOADED = "USER_POSTS_LOADED"

export const ADD_USER_SUCESS = "ADD_USER_SUCESS";
export const ADD_USER_FAILED = "ADD_USER_FAILED";


export const dispatches = {
    auth: {
      requestLogin : () => {
        return {
          type: LOGIN_REQUEST
        };
      },
      receiveLogin : (user, firebaseUser) => {
        return {
          type: LOGIN_SUCCESS,
          user,
          firebaseUser
        };
      },
      loginError : () => {
        return {
          type: LOGIN_FAILURE
        };
      },
      requestLogout : () => {
        return {
          type: LOGOUT_REQUEST
        };
      },
      receiveLogout : () => {
        return {
          type: LOGOUT_SUCCESS
        };
      },
      logoutError : () => {
        return {
          type: LOGOUT_FAILURE
        };
      },
      verifyRequest : () => {
        return {
          type: VERIFY_REQUEST
        };
      },
      verifySuccess : () => {
        return {
          type: VERIFY_SUCCESS
        };
      },
      registerSuccess : user => {
        return {
          type: REGISTER_SUCCESS,
          user
        };
      },
      registerFailure : error => {
        return {
          type: REGISTER_FAILURE,
          error
        };
      }
    },

    //TODO: The functions above are not used, need to refactor
    user: {
      userFriendsLoaded : userFriends =>{
        return{
            type: USER_FRIENDS_LOADED,
            userFriends
        }
      },
      userPostsLoaded : userPosts =>{
        return{
            type: USER_POSTS_LOADED,
            userPosts
        }
      },

      userLoopsLoaded : userLoops => {
          return {
              type: USER_LOOPS_LOADED,
              userLoops
          }
      },
      addUserSuccess: userName => {
          return {
              type:ADD_USER_SUCESS,
              userName
          }
      },
      addUserFailed: errorMsg => {
          return {
              type: ADD_USER_FAILED,
              errorMsg
          }
      }
    }
}