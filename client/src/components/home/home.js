import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { logoutUser } from "../../actions";

const Home = (props) => {

  const { 
    isLoggingOut, 
    logoutError,
    logoutUser,
    user
  } = props;

  const handleLogout = () => logoutUser();
  
  return (
    <div>
      <Typography component="h1" variant="h3">
        LoopedIn
      </Typography>
      <Typography component="h1" variant="h5">
        {user.firstName} has logged in! All routes are protected until you Logout
      </Typography>
      <Button onClick={handleLogout}>Logout</Button>
      {isLoggingOut && <p>Logging Out....</p>}
      {logoutError && <p>Error logging out</p>}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user
  };
}


export default connect(mapStateToProps)(Home);
