import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Scrollbar from "../../utils/Scrollbar";
import {
  dispatchUserSelected,
  getRecentChats
} from "../../actions/direct-messages";
import moment from "moment";


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "matchParent",
    backgroundColor: theme.palette.common.black
  },
  inline: {
    display: "inline",
    color: theme.palette.textPrimary
  },
  timeStamp: {
    float: "right",
    color: theme.palette.textPrimary
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  }
}));

const ChatList = props => {
  const classes = useStyles();

  const {
    recentChats,

    getRecentChats,
    selectedFriend,
    dispatchUserSelected
  } = props;

  useEffect(() => {
    getRecentChats();
  }, [getRecentChats]);

  const [recentChatsState, setRecentChatsState] = useState([]);

  useEffect(
    () => setRecentChatsState(recentChats === undefined ? [] : recentChats),
    [recentChats]
  );

  const [selectedFriendState, setSelectedFriendState] = useState(
    selectedFriend
  );

  useEffect(() => {
    dispatchUserSelected(selectedFriendState);
  }, [selectedFriendState]);

  const handleFriendSelection = selectedFriendState => {
    setSelectedFriendState(selectedFriendState);
  };

  const listArrayLen = recentChatsState ? recentChatsState.length : 0;

  return (
    <div
      style={{
        width: "100%",
        height: "80vh"
      }}
    >
      <Scrollbar>
        <Paper varient="outlined">
          <Box>
            <Box display="flex" justifyContent="space-between">
              <List className={classes.root}>
                {recentChatsState.map((record, index) => {
                  const { _id, firstName, lastName } = record.sender;
                  const { messageContent, created } = record;
                  return (
                    <div key={created}>
                      <ListItem
                        alignItems="flex-start"
                        button
                        selected={selectedFriendState === _id}
                        // eslint-disable-next-line no-unused-vars
                        onClick={event => handleFriendSelection(_id)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={firstName}
                            className={classes.avatar}
                            src="/static/images/avatar/"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${firstName} ${lastName}`}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {decodeEntities(messageContent)}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.timeStamp}
                              >
                                {`${moment(created).format("h:mm a")}`}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {index === listArrayLen - 1 ? (
                        <div></div>
                      ) : (
                        <Divider variant="inset" component="li" />
                      )}
                    </div>
                  );
                })}
              </List>
            </Box>
          </Box>
        </Paper>
      </Scrollbar>
    </div>
  );
};

var decodeEntities = (function() {
  var cache = {},
      character,
      e = document.createElement('div');
  
  return function(html) {
    return html.replace(/([&][^&; ]+[;])/g, function(entity) {
      character = cache[entity];
			if (!character) {
        e.innerHTML = entity;
        if (e.childNodes[0])
          character = cache[entity] = e.childNodes[0].nodeValue;
        else
          character = '';
      }
      return character;
    });
  };
})();

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    recentChats: state.directMessages.recentChats,
    selectedFriend: state.directMessages.selectedFriend
  };
}

export default connect(mapStateToProps, {
  dispatchUserSelected,
  getRecentChats
})(ChatList);
