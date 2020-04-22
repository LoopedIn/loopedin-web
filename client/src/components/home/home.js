import React, { Fragment } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { logoutUser, getUserFriends } from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../home/NavBar";
import Routing from "./Routing";

const useStyles = makeStyles(theme => ({
  main: {
    marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  }
}));

const Home = props => {
  const {
    //Objects retrieved from state
    logoutUser,
    socket
  } = props;

  const classes = useStyles();
  //console.log("socket "+ socket.send('hi'))
  return (
    <Fragment>
      <NavBar logoutUser={logoutUser} />
      <main className={classNames(classes.main)}>
        <Routing socket={socket} />
      </main>
    </Fragment>
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

export default connect(mapStateToProps, {
  logoutUser,
  getUserFriends
})(Home);
