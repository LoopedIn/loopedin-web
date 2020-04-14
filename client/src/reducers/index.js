import { combineReducers } from "redux";
import auth from "./auth";
import userConnections from "./userConnections";
import directMessages from "./directMessages";

export default combineReducers({ auth, userConnections, directMessages });
