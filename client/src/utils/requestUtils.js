import axios from 'axios';
import { myFirebase } from '../firebase/firebase';

export const authenticatedRequest = (route, postBodyParams, postGet) =>{
    myFirebase.auth()
        .currentUser
        .getIdToken()
        .then(idToken =>  axios.post(route, constructPostBodyParams(idToken, postBodyParams)))
        .then(resp => {
            console.log("Requested current user")
            postGet(resp)
        })
        .then(() => console.log("here"));
}

function constructPostBodyParams(idToken, postBodyParams){
    const csrfToken = getCookie('csrfToken');
    const authInfo = {
      'idToken' : idToken, 
      'csrfToken' : csrfToken
    };
    postBodyParams['authInfo'] = authInfo;
    return postBodyParams;
}

export const unAuthenticatedRequest = (route, postBodyParams) =>{
    return axios.post(route, postBodyParams);
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
