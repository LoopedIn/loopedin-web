import { authenticatedRequest, unAuthenticatedRequest } from  "../utils/requestUtils";
import axios from 'axios';

export const base = 'http://localhost:3000/';

const r = (route) =>  url.resolve(base, route);

export const serverRequests = {

    getCurrentUserApi : async () => authenticatedRequest(r('/users/logged_in_user_info'), {}),

    getUserFriendsApi : async () => authenticatedRequest(r('/users/getcontacts'), {}),

    createUserApi : async (token, userName, firstName, lastName, email) => {
        const postBodyParams = {
            "authToken":token,
            "email":email,
            "firstName":firstName,
            "userName":userName,
            "lastName":lastName
        }
        return unAuthenticatedRequest(r('/users/create'), postBodyParams);
    },

    getUsersLoopsApi : async () => authenticatedRequest(r('/loops'), {}),

    //TODO: fix input
    updateLoopApi: async (loopId, params) => authenticatedRequest(r(`/loops/{loopId}/update_loop`), params)
}