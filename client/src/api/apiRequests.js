import { sendAuthenticatedRequest, sendUnAuthenticatedRequest } from  "../utils/requestUtils";
import { routes } from "../utils/serverRoutes";

export const createUserApi = (token, userName, firstName, lastName, email) =>{
    const postBodyParams = {
        "authToken":token,
        "email":email,
        "firstName":firstName,
        "userName":userName,
        "lastName":lastName
    }
    return sendUnAuthenticatedRequest(routes.createUser, postBodyParams);
};

export const getCurrentUserApi = () => {
    return sendUnAuthenticatedRequest(routes.createUser, {});
}