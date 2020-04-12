import {
  USER_FRIENDS_LOADED,
  ADD_USER_SUCESS,
  ADD_USER_FAILED,
  USER_LOOPS_LOADED,
  CREATE_LOOP_SUCCESSFUL,
  CREATE_LOOP_FAILED,
  LOOPS_LIST_LOADED,
  REMOVE_USER_CONNECTION_TOASTS
} from "../utils/dispatchUtils";

const initialState = {
  userLoops: [],
  userFriends: [],
  loopLists: [],
  toastMessages: [], 
  addFriendToUserActionMsg: "",
  createLoopFailedMsg: "",
  createLoopSuccessFulMsg: ""
};

export default (state = initialState, action) => {
  console.log("in reducer");
  console.log(action.type)
  console.log({state})
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
      return { ...state, toastMessages: updatedToastMessages(state, action.msg) };
    case ADD_USER_FAILED:
      return { ...state, toastMessages: updatedToastMessages(state, action.errorMsg) };
    case CREATE_LOOP_SUCCESSFUL:
      return { ...state, toastMessages: updatedToastMessages(state, action.msg) };
    case CREATE_LOOP_FAILED:
      return { ...state, toastMessages: updatedToastMessages(state, action.msg) };
    case LOOPS_LIST_LOADED:
      return { ...state, loopLists: action.loopLists };
    case REMOVE_USER_CONNECTION_TOASTS:
      const empty = []
      return {...state, toastMessages: empty}
    default:
      return state;
  }
};

const updatedToastMessages = (state, newMessage) => {
  console.log("here");
  const newToastMessages = [...state.toastMessages, newMessage]
  return newToastMessages
}
