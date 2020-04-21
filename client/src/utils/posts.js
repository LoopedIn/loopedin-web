import {serverRequests} from "../api/apiRequests"
export const getUserPosts = async () => {
    const userPosts = (await serverRequests.getUserPosts()).data
    return userPosts
}