import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { getUserFriends, addFriendToUser } from "../../actions";
import Scrollbar from "../../utils/Scrollbar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper_add_users_card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary
  },
  paper_users: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    width: innerWidth
  },
  usernameTextbox: {
    width: "100%"
  },
  addFriendBtn: {
    justifyContent: "center",
    marginTop: "10px"
  },
  addFAB: {
    alignSelf: "flex-end"
  }
}));

const AddFriend = props => {
  const classes = useStyles();

  const {
    addFriendToUserActionMsg,
    usersFriends,

    //Methods
    getUserFriends,
    addFriendToUser
  } = props;

  useEffect(() => {
    getUserFriends();
  }, [getUserFriends]);

  const [newUser, setNewUser] = useState("");

  const [userFriendsState, setUserFriendsState] = useState([]);

  useEffect(() => {
    setUserFriendsState(usersFriends== undefined? undefined : usersFriends["friendIds"]);
  }, [usersFriends])

  const handleBtnSubmit = () => {
    addFriendToUser(newUser, userFriendsState, setUserFriendsState);
  };

  const renderFriendsList = friend => {
    return (
      <Paper style={{ marginTop: "10px" }}>
        <ListItem id={friend}>
          <ListItemText id={friend} primary={`${friend.firstName} ${friend.lastName}`} />
        </ListItem>
      </Paper>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection="column"
    >
      <div>
        <TextField
          id="outlined-basic"
          label="Your friend's username"
          className={classes.usernameTextbox}
          variant="outlined"
          size="small"
          onChange={e => setNewUser(e.target.value)}
          defaultValue={newUser}
        />
      </div>
      <div className={classes.addFriendBtn}>
        <Button variant="contained" color="secondary" onClick={handleBtnSubmit}>
          Add friend
        </Button>
      </div>
      {addFriendToUserActionMsg ? (
        <div className={classes.addFriendBtn}>{addFriendToUserActionMsg}</div>
      ) : (
        <div></div>
      )}
      <div style={{ width: "50%", height: "65vh" }}>
        <Scrollbar>
          <List>{userFriendsState != undefined ? userFriendsState.map(val => renderFriendsList(val)) : <div></div>}</List>
        </Scrollbar>
      </div>
      <div className={classes.addFAB}>
        <Fab color="secondary" onClick={() => {}}>
          <PersonAddIcon className="material-icons" />
        </Fab>
      </div>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    usersFriends: state.userConnections.userFriends,
    addFriendToUserActionMsg: state.userConnections.addFriendToUserActionMsg
  };
}

export default connect(mapStateToProps, {
  getUserFriends,
  addFriendToUser
})(AddFriend);
