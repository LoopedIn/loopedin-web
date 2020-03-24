import {serverRequests} from "../api/apiRequests"
import {dispatches} from "../utils/dispatchUtils"
import {constants} from "../utils/constants"



//Fetch all friends of user
export const getUserFriends = () => async dispatch => {
    const friendsList = (await serverRequests.getUserFriendsApi()).data; 
    // const friendsList = ['abc', 'def'] 
    console.log(friendsList);
    dispatch(dispatches.user.userFriendsLoaded(friendsList)); //Persist user's friends into state
};

//Fetch all loops of user
export const getUserLoops = () => async dispatch => {
    const loopsList = (await serverRequests.getUsersLoopsApi()).data;  
    // const loopsList = ['ghi','jkl']
    console.log(loopsList);
    dispatch(dispatches.user.userLoopsLoaded(loopsList)); //Persist user's loops info into state
};

//Update loop
export const updateLoop = () => async dispatch => {
    //TODO: will update this when the form of input from the UI is more clear
}

//Add another user as a friend
export const addFriendToUser = (userName) => async dispatch => {
    const response = (await serverRequests.addFriendToUserApi());
    if(response.status === 400){
        dispatch(dispatches.addUserFailed(`{userName} does not exist`));
    } else if (response.status === 200){
        dispatch(dispatches.user.addUserSuccess(username));
    } else {
        dispatch(dispatches.user.addUserFailed(constants.error500));
    }
}