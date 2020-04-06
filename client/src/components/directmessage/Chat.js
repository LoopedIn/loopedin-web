import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Scrollbar from "../../utils/Scrollbar";
import Chip from "@material-ui/core/Chip";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ChatMessage from "./ChatMessage";

const useStyles = makeStyles(theme => ({
  scrollBar: {
    backgroundColor: theme.palette.background.default,
    width: "100%"
  },
  root: {
    maxWidth: 600,
    margin: 8,
    width: "100%"
  },
  loadChip: {
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    justifyContent: "center"
  },
  loadChipBubble: {
    display: "flex",
    justifyContent: "center"
  }
}));

const messages = [
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  },
  {
    senderId: "Bob",
    receivingUserId: "Alice",
    messageType: "DM",
    messageContent: "Hi here is my message to you 2",
    created: "2/1/2020",
    readAt: "2/1/2020"
  }
];

const renderMessages = (messages, classes) => {
  if (messages.length == 0) {
    return <div />;
  }

  return (
    <List className={classes.root}>
      {messages.map((values, index) => {
        return <ChatMessage values={values} />;
      })}
    </List>
  );
};

const handleLoadMore = () => {};

const Chat = props => {
  const classes = useStyles();

  return (
    <div
      style={{
        width: "100%",
        height: "75vh"
      }}
    >
      <Scrollbar className={classes.scrollBar}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div className={classes.root}>
            <div className={classes.loadChipBubble}>
              <Chip
                label="Load more"
                onClick={handleLoadMore}
                className={classes.loadChip}
              />
            </div>
            {renderMessages(messages, classes)}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default Chat;
