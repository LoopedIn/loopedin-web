import React, { Fragment } from "react";
import { makeStyles, useRadioGroup } from "@material-ui/core";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  timeStamp: {
    float: "right"
  }
}));

const ChatMessage = props => {
  const { messageContent,
  isSentByMe } = props.values;

  const classes = useStyles();

  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={messageContent}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                className={classes.timeStamp}
              >
                Ali Connors
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </div>
  );
};

ChatMessage.propTypes = {};

export default ChatMessage;
