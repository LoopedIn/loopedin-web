import { serverRequests } from "../api/apiRequests";
import { dispatches } from "../utils/dispatchUtils";
import { constants } from "../utils/constants";

//Fetches all recent chats with other users
export const getRecentChats = () => async dispatch => {

};

//Sends a message to user 
export const createMessage = (recievingUser, messageContent) => async dispatch => {
 
};

//Retrieves chat history for the selected user
export const getChatHistory = (chosenFriendId) => async dispatch => {
    const chatHistoryResp = (await serverRequests.getChatHistoryApi(chosenFriendId));
    const messagesList = chatHistoryResp.data;
    messagesList.forEach(message => {
        message["isSentByMe"] = message.senderId != chosenFriendId
    })
    dispatch(dispatches.directMessages.chatHistoryLoaded(messagesList))
}

