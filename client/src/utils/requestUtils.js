import axios from "axios";
import { connect } from "react-redux";
import { myFirebase } from "../firebase/firebase";

export const authenticatedRequest = async (route, postBodyParams) => {
  const idToken = "dummy";
  // const idToken = await myFirebase.auth().currentUser.getIdToken();
  return axios.post(route, constructPostBodyParams(idToken, postBodyParams));
};

export const constructPostBodyParams = (idToken, postBodyParams) => {
  const csrfToken = getCookie("csrfToken");
  postBodyParams["idToken"] = idToken;
  postBodyParams["csrfToken"] = csrfToken;
  return postBodyParams;
};

export const unAuthenticatedRequest = (route, postBodyParams) => {
  return axios.post(route, postBodyParams);
};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
}
