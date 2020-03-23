import { authenticatedRequest, unAuthenticatedRequest } from  "../utils/requestUtils";
import axios from 'axios';
import { routes } from "../utils/serverRoutes";

export const createUserApi = (token, userName, firstName, lastName, email) =>{
    const postBodyParams = {
        "authToken":token,
        "email":email,
        "firstName":firstName,
        "userName":userName,
        "lastName":lastName
    }
    return unAuthenticatedRequest(routes.createUser, postBodyParams);
};

export const getCurrentUserApi = (postGet) => {
    authenticatedRequest(routes.getCurrentUser, {}, postGet);
}