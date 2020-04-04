import React, { Fragment } from "react";
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
            variant="filled"
            fullWidth="matchParent"
          />
        </Paper>
      </Box>
    </Fragment>
  );
};

PostChat.propTypes = {};

export default PostChat;
