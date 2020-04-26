import { serverRequests } from "../api/apiRequests";
import { dispatches } from "../utils/dispatchUtils";

//Fetches all recent chats with other users
export const getRecentChats = () => async dispatch => {
  try {
    //console.log("Getting recent chats")
    const recentChatsResp = (await serverRequests.getRecentChatsApi()).data;
    //console.log({recentChatsResp})
    dispatch(dispatches.directMessages.recentChatsLoaded(recentChatsResp));
  } catch (error) {
    //console.log(error)
  }
};

//Sends a message to user
export const createMessage = (
  recievingUserId,
  messageContent,
  postId
) => async dispatch => {
  try {
    postId !== null
      ? await serverRequests.createMessageApi(
          recievingUserId,
          "reply",
          messageContent,
          postId
        )
      : await serverRequests.createMessageApi(
          recievingUserId,
          "text",
          messageContent
        );

    dispatch(dispatches.directMessages.sentMessage(messageContent));
  } catch (error) {
    //console.log(error)
  }
};

export const dispatchUserSelected = selectedFriendId => async dispatch => {
  dispatch(dispatches.directMessages.friendSelected(selectedFriendId));
};

//Retrieves chat history for the selected user
export const getChatHistory = chosenFriendId => async dispatch => {
  const chatHistoryResp = await serverRequests.getChatHistoryApi(
    chosenFriendId
  );
  const messagesList = chatHistoryResp.data.reverse();
  messagesList.forEach(message => {
    message["isSentByMe"] = message.senderId != chosenFriendId;
  });
  dispatch(dispatches.directMessages.chatHistoryLoaded(messagesList));
};
