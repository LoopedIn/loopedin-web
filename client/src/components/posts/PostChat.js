import React, { Fragment, useState } from "react";
import PostLists from "./PostLists";
import PropTypes from "prop-types";
import {
  Paper,
  Typography,
  TextField,
  makeStyles,
  Box
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({}));

const PostChat = props => {
  const [postText, setPostText] = useState("");
  const [disableButton, setDisableButton] = useState(true);
  const [checkBoxSelected, setCheckBoxSelected] = useState(false);

  const parentCallback = btnDisabled => {
    btnDisabled == false
      ? setCheckBoxSelected(true)
      : setCheckBoxSelected(false);
    btnDisabled == false && postText != ""
      ? setDisableButton(false)
      : setDisableButton(true);
  };

  return (
    <Fragment>
      <Box>
        <Paper>
          <TextField
            id="send-message-to-loops"
            label="Send Message to Loops"
            multiline
            rows="10"
            defaultValue=""
            onChange={e => {
              e.target.value != "" && checkBoxSelected == true
                ? setDisableButton(false)
                : setDisableButton(true);
            }}
            onBlur={e => {
              setPostText(e.target.value);
            }}
            variant="filled"
            fullWidth
          />
        </Paper>
        <PostLists
          postText={postText}
          parentCallback={parentCallback}
          disableButton={disableButton}
        />
      </Box>
    </Fragment>
  );
};

PostChat.propTypes = {};

export default PostChat;
