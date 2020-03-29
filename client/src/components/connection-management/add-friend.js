import React from "react";
import Register from "../register/register";
import LoginSide from "../login/login";
import ProtectedRoute from "../protected-route/protectedRoute";
import Home from "../home/home";
import ConnectionManagerHome from '../connection-management/connection-manager'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { connect } from "react-redux";

const AddFriend = () =>{
<Fragment></Fragment>
}

export default connect(null)(AddFriend);
