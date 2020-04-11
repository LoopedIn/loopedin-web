import {
    CHAT_HISTORY_LOADED,
} from "../utils/dispatchUtils"

const initialState = {
    chatHistory: {}
}

export default (state=initialState, action) => {
    switch(action.type){
        case CHAT_HISTORY_LOADED:
            return {...state, chatHistory: action.msg}
        default:
            return state;
    }
}