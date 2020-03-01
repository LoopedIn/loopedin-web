import React from "react";
import Register from "../register/register";
import LoginSide from "../login/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginSide />
          </Route>
          <Route path="/login">
            <LoginSide />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
