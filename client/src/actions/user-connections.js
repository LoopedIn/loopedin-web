import {serverRequests} from "../api/apiRequests"
import {dispatches} from "../utils/dispatchUtils"
import {constants} from "../utils/constants"



//Fetch all friends of user
export const getUserFriends = () => async dispatch => {
    const friendsList = (await serverRequests.getUserFriendsApi()).data; 
    dispatch(dispatches.user.userFriendsLoaded(friendsList[0])); //Persist user's friends into state //TODO: why is this a list?
};

export const createLoop = (loopName) => async dispatch =>{
    console.log("Create loop called with " + loopName);
    try{
        (await serverRequests.createLoopApi(loopName))
        dispatch(dispatches.loop.createLoopSuccess("Loop created!"));
    } catch(error){
        console.log(error)
        const errorResp = error.response.data;
        if(errorResp.includes("dup")) {
            dispatch(dispatches.loop.createLoopFailed("A loop with this name already exists!"));
        } else{
            dispatch(dispatches.loop.createLoopFailed(constants.error500));
        }
    }
}

//Fetch all loops of user
export const getUserLoopInfo = () => async dispatch => {
    const loopsList = (await serverRequests.getUsersLoopsApi()).data;
    const friendsList = (await serverRequests.getUserFriendsApi()).data[0].friendIds;
    const loopsWithAllContactInfo = {}
    loopsList.forEach(rec => {
        let friendNameVsIsSeleted = {}
        friendsList.forEach(friendRec => {
            friendNameVsIsSeleted[friendRec] = rec.receivingUsers.includes(friendRec)
        })
        loopsWithAllContactInfo[rec.loopName] = friendNameVsIsSeleted
    })
    dispatch(dispatches.user.userLoopsLoaded(loopsWithAllContactInfo)); //Persist user's loops info into state
};

//Update loop
export const updateLoop = (loopVsSelectedFriendsConfig) => async dispatch => {
    console.log({loopVsSelectedFriendsConfig})
    //TODO: will update this when the form of input from the UI is more clear
}

//Add another user as a friend
export const addFriendToUser = (userName, userFriendsState, setUserFriendsState) => async dispatch => {
    const params = {
        "friendIds":[userName]
    }
    try{
        (await serverRequests.addFriendToUserApi(params));
        dispatch(dispatches.user.addUserSuccess(`${userName} is now your friend!`));
        setUserFriendsState([...userFriendsState,userName])
    } catch (error){
       const errorResp = error.response.data;
       if(errorResp.includes("does not exist")){
            dispatch(dispatches.user.addUserFailed("The user you are trying to add does not exist"));
       } else if(errorResp.includes("already a friend")){
            dispatch(dispatches.user.addUserFailed(`${userName} is already a friend`));
       } else{
            dispatch(dispatches.user.addUserFailed(constants.error500));
       }
    }
}