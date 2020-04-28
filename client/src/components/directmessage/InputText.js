import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Input, makeStyles } from "@material-ui/core";
import Send from "@material-ui/icons/Send";
import { Fab } from "@material-ui/core";
import { createMessage } from "../../actions/direct-messages";

const InputText = props => {
  const {
    createMessage,
    selectedFriend,
    textBoxHeight,
    sendFunction,
    senderId,
    postId
  } = props;

  const [inputText, setInputText] = useState("");

  const useStyles = makeStyles(theme => ({
    root: {
      display: "block",
      alignItems: "row",
      justifyContent: "center",
      height: textBoxHeight,
      backgroundColor: theme.palette.background.main,
      margin: 5,
      marginBottom: 15,
      marginRight: 15,
      marginLeft: 15
    },
    inputBox: {
      backgroundColor: theme.palette.common.darkBlack,
      flexGrow: 1,
      height: 56,
      borderRadius: 30,
      paddingLeft: 8,
      paddingRight: 8,
      margin: 5
    }
  }));

  const classes = useStyles();

  const [chosenUser, setChosenUser] = useState(selectedFriend);
  useEffect(() => {
    setChosenUser(selectedFriend);
  }, [selectedFriend]);

  const handleSendMessage = () => {
    createMessage(chosenUser, inputText);
    setInputText("");
  };

  const handleSendPostReply = () => {
    createMessage(senderId, inputText, postId);
    setInputText("");
  };

  return (
    <div className={classes.root}>
      {chosenUser === undefined ? (
        <div></div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className={classes.inputBox}>
            <div
              style={{
                position: "relative",
                display: "inline-block",
                width: "100%"
              }}
            >
              <Input
                id="message"
                style={{
                  position: "absolute",
                  height: 42,
                  width: "calc(100% - 72px)",
                  lineHeight: undefined,
                  top: -6,
                  left: 15,
                  right: 50
                }}
                multiline
                rowsMax="2"
                disableUnderline={true}
                onChange={e => {
                  setInputText(e.target.value);
                }}
                fullWidth={true}
                autoComplete="off"
                placeholder="Write Message..."
                // eslint-disable-next-line no-unused-vars
                onKeyDown={e => {}}
                // eslint-disable-next-line no-unused-vars
                ref={_field => {}}
                type="Text"
                value={inputText}
              />
            </div>
          </div>
          <Fab
            color={"primary"}
            onClick={() => {
              sendFunction === "handleSendPostReply"
                ? handleSendPostReply()
                : handleSendMessage();
            }}
            aria-label="send"
          >
            <Send />
          </Fab>
        </div>
      )}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user,
    selectedFriend: state.directMessages.selectedFriend,
    textBoxHeight: ownProps.textBoxHeight,
    senderId: ownProps.senderId,
    postId: ownProps.postId
  };
}

export default connect(mapStateToProps, { createMessage })(InputText);
