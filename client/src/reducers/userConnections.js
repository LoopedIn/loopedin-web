import {
    USER_FRIENDS_LOADED,
    ADD_USER_SUCESS,
    ADD_USER_FAILED,
    USER_LOOPS_LOADED
} from "../utils/dispatchUtils"

const initialState = {
    userLoops : [],
    userFriends : [],
    addFriendToUserErrMsg:{}
}

export default (state=initialState, action) => {
    switch(action.type){
        case USER_FRIENDS_LOADED:
            return {...state, userFriends: action.userFriends}
        case USER_LOOPS_LOADED:
            return {...state, userLoops: action.userLoops}
        default:
            return state;
    }
}