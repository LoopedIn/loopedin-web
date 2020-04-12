import React, {  useState, useEffect,Fragment } from "react";
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
import PropTypes from "prop-types";
import { dispatchUserSelected, getRecentChats } from "../../actions/direct-messages";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "matchParent",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  timeStamp: {
    float: "right"
  }
}));

const ChatList = props => {
  const classes = useStyles();

  const {
    recentChats,

    getRecentChats,
    dispatchUserSelected
  } = props;

  useEffect(() => {getRecentChats();}, [getRecentChats])

  const [recentChatsState, setRecentChatsState] =  useState([])

  useEffect(() => setRecentChatsState(recentChats === undefined? [] : recentChats), [recentChats])

  const [selectedFriendState, setSelectedFriendState] = useState("");

  useEffect(() => {dispatchUserSelected(selectedFriendState)}, [selectedFriendState])

  const handleFriendSelection = (selectedFriendState) => {
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
                  const {_id, firstName, lastName} = record.sender;
                  const {messageContent, created} = record;
                  return (
                    <div>
                      <ListItem alignItems="flex-start" 
                        button
                        selected={selectedFriendState === _id}
                        onClick={event => handleFriendSelection(_id)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={firstName}
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
                                {messageContent}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.timeStamp}
                              >
                                {created}
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

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    recentChats: state.directMessages.recentChats
  };
}

export default connect(mapStateToProps, {
  dispatchUserSelected,
  getRecentChats
})(ChatList);
