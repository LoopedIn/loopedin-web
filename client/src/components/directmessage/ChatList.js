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
import { dispatchUserSelected } from "../../actions/direct-messages";

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
    dispatchUserSelected
  } = props;

  const chatList = [
    {
      firstName: "FriendA",
      lastName: "FriendA",
      messageList: [],
      timeStamp: "TimeStamp",
      friendId:"5e90eed6b47068a3f2974526"
    },
    {
      firstName: "FriendB",
      lastName: "FriendB",
      messageList: [],
      friendId:"5e90eee7b47068a3f2974527",
      timeStamp: "TimeStamp"
    }
  ];

  const getLatestMessage = value => {
    return " — I'll be in your neighborhood doing errands this…sdasdasdasdasdasdasda sdadsdasdasdas sdasdasdasd asdasdasd";
  };

  const [selectedFriendState, setSelectedFriendState] = useState(chatList[0].friendId);

  useEffect(() => {dispatchUserSelected(selectedFriendState)}, [selectedFriendState])

  const handleFriendSelection = (selectedFriendState) => {
    setSelectedFriendState(selectedFriendState);
  };

  const listArrayLen = chatList.length;

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
                {chatList.map((value, index) => {
                  return (
                    <div>
                      <ListItem alignItems="flex-start" 
                        button
                        selected={selectedFriendState === value.friendId}
                        onClick={event => handleFriendSelection(value.friendId)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={value.firstName}
                            src="/static/images/avatar/"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${value.firstName} ${value.lastName}`}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                              >
                                {getLatestMessage(value)}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                className={classes.timeStamp}
                              >
                                {value.timeStamp}
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
  };
}

export default connect(mapStateToProps, {dispatchUserSelected})(ChatList);
