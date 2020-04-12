import { serverRequests } from "../api/apiRequests";
import { dispatches } from "../utils/dispatchUtils";
import { constants } from "../utils/constants";

//Fetch all friends of user
export const getUserFriends = () => async dispatch => {
  const friendsList = (await serverRequests.getUserFriendsApi()).data;
  dispatch(dispatches.user.userFriendsLoaded(friendsList[0])); //Persist user's friends into state //TODO: why is this a list?
};

export const createLoop = loopName => async dispatch => {
  console.log("Create loop called with " + loopName);
  try {
    await serverRequests.createLoopApi(loopName);
    dispatch(dispatches.loop.createLoopSuccess("Loop created!"));
  } catch (error) {
    console.log(error);
    const errorResp = error.response.data;
    const errorMsg = errorResp.errmsg;
    if (errorMsg.includes("dup")) {
      dispatch(
        dispatches.loop.createLoopFailed(
          "A loop with this name already exists!"
        )
      );
    } else {
      dispatch(dispatches.loop.createLoopFailed(constants.error500));
    }
  }
};

//Fetch all loops of user
export const getUserLoopInfo = () => async dispatch => {
  const loopsList = (await serverRequests.getUsersLoopsApi()).data;
  const userFriendsResp = await serverRequests.getUserFriendsApi();
  const friendsList =
    userFriendsResp.data.length === 0 ? [] : userFriendsResp.data[0].friendIds;
  const loopsWithAllContactInfo = {};
  loopsList.forEach(rec => {
    let friendNameVsIsSeleted = {};
    friendsList.forEach(friendRec => {
      friendNameVsIsSeleted[friendRec.userName] = rec.receivingUsers.includes(
        friendRec._id
      );
    });
    loopsWithAllContactInfo[rec.loopName] = friendNameVsIsSeleted;
  });
  dispatch(
    dispatches.user.userLoopsLoaded(loopsWithAllContactInfo, friendsList)
  ); //Persist user's loops info into state
};

//Update loop
export const updateLoop = (
  loopVsSelectedFriendsConfig,
  friendsList
) => async dispatch => {
  const loopsList = (await serverRequests.getUsersLoopsApi()).data;
  Object.keys(loopVsSelectedFriendsConfig).forEach(async loopName => {
    const loopId = loopsList.filter(rec => rec["loopName"] === loopName)[0][
      "_id"
    ];
    const contacts = [];
    const vals = {};
    const reqParam = {};
    Object.keys(loopVsSelectedFriendsConfig[loopName]).forEach(friendName => {
      if (loopVsSelectedFriendsConfig[loopName][friendName]) {
        let friendId = friendsList.filter(
          friend => friend.userName === friendName
        )[0]._id;
        contacts.push(friendId);
      }
    });
    vals["loopId"] = loopId;
    vals["loopName"] = loopName;
    vals["contacts"] = contacts;
    reqParam["loop"] = vals;
    await serverRequests.updateLoopApi(loopId, reqParam);
  });
};

//Add another user as a friend
export const addFriendToUser = (
  userName,
  userFriendsState,
  setUserFriendsState
) => async dispatch => {
  const params = {
    friendIds: [userName]
  };
  try {
    await serverRequests.addFriendToUserApi(params);
    dispatch(dispatches.user.addUserSuccess(`${userName} is now your friend!`));
    setUserFriendsState([...userFriendsState, userName]);
  } catch (error) {
    const errorResp = error.response.data;
    if (errorResp.includes("does not exist")) {
      dispatch(
        dispatches.user.addUserFailed(
          "The user you are trying to add does not exist"
        )
      );
    } else if (errorResp.includes("already a friend")) {
      dispatch(
        dispatches.user.addUserFailed(`${userName} is already a friend`)
      );
    } else {
      dispatch(dispatches.user.addUserFailed(constants.error500));
    }
  }
};

export const getLoopLists = () => async dispatch => {
  const loopsList = (await serverRequests.getUsersLoopsApi()).data;
  const loadedLoops = [];
  loopsList.forEach(loop => {
    loadedLoops.push({ loopName: loop.loopName, loopId: loop._id });
  });
  dispatch(dispatches.loop.getLoopListsSuccess(loadedLoops));
};

export const removeToastMessages = () => async dispatch => {
  dispatch(dispatches.user.removeToastMessages());
};
