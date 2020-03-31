import { combineReducers } from "redux";
import auth from "./auth";
import userConnections from "./userConnections";

export default combineReducers({ auth, userConnections });
