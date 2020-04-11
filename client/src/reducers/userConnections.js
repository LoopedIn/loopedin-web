import {
  USER_FRIENDS_LOADED,
  ADD_USER_SUCESS,
  ADD_USER_FAILED,
  USER_LOOPS_LOADED,
  CREATE_LOOP_SUCCESSFUL,
  CREATE_LOOP_FAILED,
  LOOPS_LIST_LOADED
} from "../utils/dispatchUtils";

const initialState = {
  userLoops: [],
  userFriends: [],
  loopLists: [],
  addFriendToUserActionMsg: "",
  createLoopFailedMsg: "",
  createLoopSuccessFulMsg: ""
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
      return { ...state, addFriendToUserActionMsg: action.msg };
    case ADD_USER_FAILED:
      return { ...state, addFriendToUserActionMsg: action.errorMsg };
    case CREATE_LOOP_SUCCESSFUL:
      return { ...state, createLoopSuccessFulMsg: action.msg };
    case CREATE_LOOP_FAILED:
      return { ...state, createLoopFailedMsg: action.msg };
    case LOOPS_LIST_LOADED:
      return { ...state, loopLists: action.loopLists };
    default:
      return state;
  }
};
