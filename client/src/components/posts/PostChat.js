import React, { Fragment, useState, useRef } from "react";
import PostLists from "./PostLists";
import MyPosts from "./MyPosts";
import { Paper, TextField, Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paperBackground: {
    backgroundColor: theme.palette.background.default
  },
  root: {
    color: "white"
  }
}));

const PostChat = () => {
  const [postText, setPostText] = useState("");
  const [postTextForState, setPostTextForState] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [checkBoxSelected, setCheckBoxSelected] = useState(false);
  const [loopSentTime, setloopSentTime] = useState("");
  const textBoxref = useRef();
  const classes = useStyles();

  const parentCallback = btnDisabled => {
    btnDisabled == false
      ? setCheckBoxSelected(true)
      : setCheckBoxSelected(false);
    btnDisabled == false && postText != "" && postText.trim().length !== 0
      ? setDisableButton(false)
      : setDisableButton(true);
  };

  const parentCallbackForPosts = loopSentTime => {
    textBoxref.current.value = "";
    setloopSentTime(loopSentTime);
    setPostTextForState("");
  };

  return (
    <Fragment>
      <Box>
        <Paper className={classes.paperBackground}>
          <TextField
            id="send-message-to-loops"
            label="Send Message to Loops"
            multiline
            rows="10"
            value={postTextForState}
            onChange={e => {
              e.target.value != "" &&
              e.target.value.trim().length !== 0 &&
              checkBoxSelected == true
                ? setDisableButton(false)
                : setDisableButton(true);
              setPostTextForState(e.target.value);
            }}
            onBlur={e => {
              setPostText(e.target.value);
              setPostTextForState(e.target.value);
            }}
            variant="filled"
            ref={textBoxref}
            fullWidth
          />
        </Paper>
        <PostLists
          postText={postText}
          parentCallback={parentCallback}
          parentCallbackForPosts={parentCallbackForPosts}
          disableButton={disableButton}
        />
        <MyPosts loopSentTime={loopSentTime} />
      </Box>
    </Fragment>
  );
};

PostChat.propTypes = {};

export default PostChat;
