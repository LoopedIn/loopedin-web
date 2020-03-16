import axios from 'axios';

export const sendAuthenticatedRequest = (route, postBodyParams) =>{
    return firebase.auth()
        .currentUser
        .getIdToken()
        .then(idToken => {
          const csrfToken = getCookie('csrfToken');
          const authInfo = {
            'idToken' : idToken, 
            'csrfToken' : csrfToken
          };
          postBodyParams['authInfo'] = authInfo;
          return axios.post(route, postBodyParams);
      });
}

export const sendUnAuthenticatedRequest = (route, postBodyParams) =>{
    return axios.post(route, postBodyParams);
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
