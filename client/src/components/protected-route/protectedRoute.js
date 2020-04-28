import React from "react";
import { Route, Redirect } from "react-router-dom";
import SocketContext from "../../utils/socket-context";
const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  // eslint-disable-next-line no-unused-vars
  socket,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        <SocketContext.Consumer>
          {socket => <Component {...props} socket={socket} />}
        </SocketContext.Consumer>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
