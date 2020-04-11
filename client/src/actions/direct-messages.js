import { serverRequests } from "../api/apiRequests";
import { dispatches } from "../utils/dispatchUtils";
import { constants } from "../utils/constants";

//Fetches all recent chats with other users
export const getRecentChats = () => async dispatch => {

};

//Sends a message to user 
export const createMessage = (recievingUserId, messageContent) => async dispatch => {
    try{
        console.log(`Sending message ${messageContent}`);
        (await serverRequests.createMessageApi(recievingUserId, "text", messageContent));
        dispatch(dispatches.directMessages.sentMessage(messageContent));
    } catch(error){
        console.log(error)
    }
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

