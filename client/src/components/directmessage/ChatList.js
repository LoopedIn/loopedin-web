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
<<<<<<< HEAD
=======
import Box from "@material-ui/core/Box";
import Scrollbar from "../../utils/Scrollbar";
>>>>>>> feature/suhan-front-end
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
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
    },
    {
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
    },
    {
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
    },
    {
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
<<<<<<< HEAD
=======
    },
    {
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
    },
    {
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
    },
    {
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
    },
    {
      firstName: "Suhan",
      lastName: "Test",
      messageList: [],
      timeStamp: "TimeStamp"
>>>>>>> feature/suhan-front-end
    }
  ];

  const getLatestMessage = value => {
<<<<<<< HEAD
    return "HI";
=======
    return " — I'll be in your neighborhood doing errands this…sdasdasdasdasdasdasda sdadsdasdasdas sdasdasdasd asdasdasd";
>>>>>>> feature/suhan-front-end
  };

  const listArrayLen = chatList.length;

  return (
<<<<<<< HEAD
    <Fragment>
      <Paper varient="outlined">
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
                          variant="body3"
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
      </Paper>
    </Fragment>
=======
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
                                variant="body3"
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
>>>>>>> feature/suhan-front-end
  );
};

ChatList.propTypes = {};

export default ChatList;
