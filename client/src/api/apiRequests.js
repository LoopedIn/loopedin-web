import { sendAuthenticatedRequest, sendUnAuthenticatedRequest } from  "../utils/requestUtils";
import { routes } from "../utils/serverRoutes";

export const createUserApi = (token, firstName, lastName, email) =>{
    const postBodyParams = {
        "authToken":token,
        "email":email,
        "firstName":firstName,
        "lastName":lastName
    }
    return sendUnAuthenticatedRequest(routes.createUser, postBodyParams);
};

export const getCurrentUserApi = () => {
    return sendUnAuthenticatedRequest(routes.createUser, {});
}