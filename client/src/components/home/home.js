import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { logoutUser, getUserFriends, getUserLoops } from "../../actions";

const Home = (props) => {

  const { 
    //Objects retrieved from state
    isLoggingOut, logoutError,logoutUser,
    user, loops, friends,

    //Actions to run on page load
    getUserFriends,getUserLoops
  } = props;

  //Runs getUserFriends and getUserloops when component is loaded
  useEffect(() =>  {
    getUserFriends()
  }, [getUserFriends])

  useEffect(() =>  {
    getUserLoops()
  }, [getUserLoops])

  
  return (
    <div>
      <Typography component="h1" variant="h3">
        LoopedIn
      </Typography>
      <Typography component="h1" variant="h5">
        {user.firstName} has logged in! All routes are protected until you Logout
      </Typography>
      <Typography component="h1" variant="h5">
        {loops}
      </Typography>
      <Typography component="h1" variant="h5">
        {friends}
      </Typography>
      <Button onClick={logoutUser}>Logout</Button>
      {isLoggingOut && <p>Logging Out....</p>}
      {logoutError && <p>Error logging out</p>}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
    loops: state.userConnections.userLoops,
    friends: state.userConnections.userFriends
  };
}

export default connect(mapStateToProps, { logoutUser, getUserFriends, getUserLoops })(Home);
