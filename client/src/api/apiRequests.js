import {
  authenticatedRequest,
  unAuthenticatedRequest
} from "../utils/requestUtils";

// export const base = "http://loopedin.site/api";

const url = require("url");

const r = route => `http://loopedin.site/api${route}`;

export const serverRequests = {
  getCurrentUserApi: async () =>
    authenticatedRequest(r("/users/logged_in_user_info"), {}),

  getUserFriendsApi: async () =>
    authenticatedRequest(r("/users/getcontacts"), {}),

  createUserApi: async (token, userName, firstName, lastName, email) => {
    const postBodyParams = {
      authToken: token,
      email: email,
      firstName: firstName,
      userName: userName,
      lastName: lastName
    };
    return unAuthenticatedRequest(r("/users/create"), postBodyParams);
  },

  getUsersLoopsApi: async () => authenticatedRequest(r("/loops"), {}),

  getUserPosts: async () =>
    authenticatedRequest(r("/posts/get_recent_posts"), {}),

  //TODO: fix input
  updateLoopApi: async (loopId, params) =>
    authenticatedRequest(r(`/loops/${loopId}/update_loop`), params),

  addFriendToUserApi: async params =>
    authenticatedRequest(r("/users/add_friend"), params),

  createLoopApi: async loopName => {
    const postBodyParams = {
      loopName: loopName
    };
    return authenticatedRequest(r("/users/create_loop"), postBodyParams);
  },

  getChatHistoryApi: async _friendId => {
    const postBodyParams = {
      friendID: _friendId
    };
    return authenticatedRequest(r("/users/get_chat_history"), postBodyParams);
  },

  getRecentChatsApi: async () =>
    authenticatedRequest(r("/users/get_recent_chats"), {}),

  createMessageApi: async (
    receivingUserId,
    messageType,
    messageContent,
    postId
  ) => {
    return authenticatedRequest(r("/users/create_message"), {
      receivingUserId,
      messageType,
      messageContent,
      ...(postId && { replyToPost: postId })
    });
  },

  sendLoopMessage: async (loopMessage, loopList) => {
    const params = {
      postType: "text",
      postContent: loopMessage,
      receivingLoopIds: loopList
    };

    try {
      return authenticatedRequest(r("/users/create_post"), params);
    } catch (error) {
      //console.log(error);
    }
  },

  getMyPostsList: async () => {
    return authenticatedRequest(r("/users/user_posts"), {});
  },

  deletePostMessage: async postId => {
    const route = `/posts/${postId}/delete`;
    return authenticatedRequest(r(route), {}, true);
  }
};
