import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Scrollbar from "../../utils/Scrollbar";
import Chip from "@material-ui/core/Chip";
import { Paper } from "@material-ui/core";
import List from "@material-ui/core/List";
import ChatMessage from "./ChatMessage";
import {getChatHistory} from "../../actions/direct-messages";

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

const Chat = props => {
  const classes = useStyles();
  
  const {
    getChatHistory,

    sentMessage,
    selectedFriend,
    chatHistory
  } = props;

  useEffect(() => {
    getChatHistory(chosenUser)
  }, [sentMessage, selectedFriend]);

  const chosenUser = selectedFriend;
  const [chatHistoryState, setChatHistoryState] = useState(chatHistory);
  useEffect(() => {setChatHistoryState(chatHistory)}, [chatHistory])

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
            {renderMessages(chatHistoryState, classes)}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    chatHistory: state.directMessages.chatHistory,
    sentMessage:  state.directMessages.sentMessage,
    selectedFriend: state.directMessages.selectedFriend
  };
}

export default connect(mapStateToProps, {getChatHistory})(Chat);
