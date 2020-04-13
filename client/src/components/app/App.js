import React from "react";
import Register from "../register/register";
import LoginSide from "../login/login";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import Home from "../home/home";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import Pace from "../../utils/Pace";
import GlobalStyles from "./GlobalStyles";
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
import theme from "./theme";

const App = ({ isAuthenticated, isVerifying }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Pace color={theme.palette.secondary.light} />
      <GlobalStyles />
      <Switch>
        <Route path="/login">
          <LoginSide />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoute
          path="/"
          component={Home}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
      </Switch>
    </MuiThemeProvider>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);
