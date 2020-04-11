import React, { Fragment } from "react";
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
  const chatList = [
    {
      firstName: "FriendA",
      lastName: "FriendA",
      messageList: [],
      timeStamp: "TimeStamp"
    },
    {
      firstName: "FriendB",
      lastName: "FriendB",
      messageList: [],
      timeStamp: "TimeStamp"
    }
  ];

  const getLatestMessage = value => {
    return " — I'll be in your neighborhood doing errands this…sdasdasdasdasdasdasda sdadsdasdasdas sdasdasdasd asdasdasd";
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
                      <ListItem alignItems="flex-start">
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

ChatList.propTypes = {};

export default ChatList;
