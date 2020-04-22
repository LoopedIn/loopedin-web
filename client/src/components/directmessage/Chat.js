import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Scrollbar from "../../utils/Scrollbar";
import List from "@material-ui/core/List";
import ChatMessage from "./ChatMessage";
import moment from "moment";
import { getChatHistory } from "../../actions/direct-messages";

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
  if (messages == undefined || messages.length == 0) {
    return <div />;
  }
  let currentDate = "";
  return (
    <List className={classes.root}>
      {messages.map(values => {
        let dateChanged = false;
        //console.log(Math.abs(moment(values.created).diff(moment(), "days")));
        if (
          Math.abs(moment(values.created).diff(moment(), "days")) !== 0 &&
          currentDate != values.created
        ) {
          dateChanged = true;
          currentDate = values.created;
        }
        return (
          <ChatMessage
            dateChanged={dateChanged}
            values={values}
            key={values.created}
          />
        );
      })}
    </List>
  );
};

const Chat = props => {
  const classes = useStyles();

  const {
    getChatHistory,
    socket,
    user,
    sentMessage,
    selectedFriend,
    chatHistory
  } = props;

  //console.log("sent message "+sentMessage+" \n"+"chat history "+ JSON.stringify(chatHistory))
  let scrollComponent = useRef();

  const [lastUpdatedAt, setLastUpdatedAt] = useState("");
  useEffect(() => {
    //console.log("reloading component");
    getChatHistory(chosenUser);
    if (scrollComponent.current) {
      scrollComponent.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sentMessage, selectedFriend, lastUpdatedAt]);

  const chosenUser = selectedFriend;
  const [chatHistoryState, setChatHistoryState] = useState(chatHistory);

  useEffect(() => {
    //console.log("setchathistory");
    setChatHistoryState(chatHistory);
    if (scrollComponent.current) {
      scrollComponent.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  useEffect(() => {
    //console.log("inside socket block");
    //   //socket.connect()
    //console.log("Socket " + socket.id);
    //console.log("reloading component")
    socket.emit("storeUserID", { userID: user._id, socketID: socket.id });

    // eslint-disable-next-line no-unused-vars
    socket.on("reloadComponent", data => {
      //console.log("I am listening ");
      //getChatHistory(chosenUser)
      setLastUpdatedAt(new Date());
    });
  }, socket.id);

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
            {chosenUser === undefined ? (
              <div></div>
            ) : (
              renderMessages(chatHistoryState, classes)
            )}
          </div>
        </div>
        <div ref={scrollComponent}></div>
      </Scrollbar>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    chatHistory: state.directMessages.chatHistory,
    sentMessage: state.directMessages.sentMessage,
    selectedFriend: state.directMessages.selectedFriend
  };
}

export default connect(mapStateToProps, { getChatHistory })(Chat);
