import React from "react";
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
//import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import moment from "moment";
import Linkify from "react-linkify";

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
    backgroundColor: theme.palette.common.black,
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
  },
  typographyMain: {
    display: "flex",
    margin: 5,
    padding: 0,
    flexOrientation: "row",
    justifyContent: "space-between",
    width: "fit-content"
  },
  chatBubbleMain: {
    display: "flex",
    width: "100%"
  },
  chatBubbleMainRight: {
    justifyContent: "flex-end"
  },
  chatBubbleMainLeft: {
    justifyContent: "flex-start"
  },
  replyPostRoot: {
    margin: "10px 10px 2px 10px",
    width: "fit-content",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.tertiary.main,
    display: "flex",
    flexDirection: "row",
    borderRadius: "10px"
  },
  replyPostLeftSpan: {
    flex: "none",
    width: "4px",
    backgroundColor: theme.palette.primary.main,
    borderTopLeftRadius: "7.5px",
    borderBottomLeftRadius: "7.5px"
  },
  replyPostContent: {
    margin: "5px"
  },
  contentColor: {
    color: theme.palette.textPrimary
  },
  timeStampIndent: {
    fontSize: 9,
    marginLeft: 25,
    alignSelf: "flex-end",
    color: theme.palette.textPrimary
  }
}));

const ChatMessage = props => {
  //const { dateChanged } = props;
  const { messageContent, isSentByMe, created, replyToPost } = props.values;

  const classes = useStyles();

  //const days = moment(created).diff(moment(), "days");

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  return (
    <div>
      <ListItem>
        {/* {dateChanged && (
          <div className={classes.timeStamp}>
            <Chip label={Math.abs(days)} />
          </div>
        )} */}
        <div
          className={classNames(
            isSentByMe
              ? classes.chatBubbleMainRight
              : classes.chatBubbleMainLeft,
            classes.chatBubbleMain
          )}
        >
          <div
            className={classNames(
              isSentByMe ? classes.rightChatBubble : classes.leftChatBubble,
              classes.chatBubble
            )}
          >
            {replyToPost !== undefined ? (
              replyToPost.postContent ? (
                <div className={classes.replyPostRoot}>
                  <div className={classes.replyPostLeftSpan}></div>
                  <div className={classes.replyPostContent}>
                    {replyToPost.postContent}
                  </div>
                </div>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}
            <div className={classes.typographyMain}>
              <Typography
                variant="body1"
                color="inherit"
                className={classes.chatBubbleInner}
              >
                <Linkify componentDecorator={componentDecorator}>
                  <Typography className={classes.contentColor} variant="body2">
                    {messageContent}
                  </Typography>
                </Linkify>
              </Typography>
              <div className={classes.timeStampIndent}>{`${moment(
                created
              ).format("h:mm a")}`}</div>
            </div>
          </div>
        </div>
      </ListItem>
    </div>
  );
};

ChatMessage.propTypes = {};

export default ChatMessage;
