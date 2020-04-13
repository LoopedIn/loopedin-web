import React, { Fragment } from "react";
import { makeStyles, useRadioGroup } from "@material-ui/core";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  timeStamp: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  chatBubble: {
    margin: 1,
    marginTop: 5,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily
  },
  leftChatBubble: {
    borderRadius: "0px 15px 15px 15px"
  },
  rightChatBubble: {
    borderRadius: "15px 0 15px 15px"
  },
  chatBubbleInner: {
    maxWidth: 500,
    width: "fit-content",
    fontSize: 20,
    padding: 10,
    margin: "auto",
    whiteSpace: "pre-wrap",
    overflowWrap: "break-word"
  }
}));

const ChatMessage = props => {
  const { dateChanged } = props;
  const { messageContent, isSentByMe, created } = props.values;

  const classes = useStyles();

  const days = moment(created).diff(moment(), "days");

  return (
    <div>
      <ListItem>
        {dateChanged && (
          <div className={classes.timeStamp}>
            <Chip label={Math.abs(days)} />
          </div>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: isSentByMe ? "flex-end" : "flex-start"
          }}
        >
          <div
            className={classNames(
              isSentByMe ? classes.rightChatBubble : classes.leftChatBubble,
              classes.chatBubble
            )}
          >
            <div
              style={{
                display: "flex",
                margin: 5,
                padding: 0,
                flexOrientation: "row",
                justifyContent: "space-between",
                width: "fit-content"
              }}
            >
              <Typography
                variant="body1"
                color="inherit"
                className={classes.chatBubbleInner}
              >
                <Typography variant="body1">{messageContent}</Typography>
              </Typography>
              <div
                style={{
                  fontSize: 9,
                  marginLeft: 25,

                  alignSelf: "flex-end"
                }}
              >
                {`${moment(created).format("h:mm a")}`}
              </div>
            </div>
          </div>
        </div>
      </ListItem>
    </div>
  );
};

ChatMessage.propTypes = {};

export default ChatMessage;
