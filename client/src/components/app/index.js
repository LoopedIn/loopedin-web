import React from "react";
import Register from "../register/register";
import LoginSide from "../login/login";
import ProtectedRoute from "../protected-route/protectedRoute";
import Home from "../home/home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { connect } from "react-redux";

const App = ({ isAuthenticated, isVerifying } ) => {
  return (
    <Switch>
      {/* <Route exact path="/">
            <LoginSide />
          </Route> */}
      <Route path="/login">
        <LoginSide />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
    </Switch>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);
