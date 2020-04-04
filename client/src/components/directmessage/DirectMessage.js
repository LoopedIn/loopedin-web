import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Chat from "./Chat";
import ChatList from "./ChatList";

const DirectMessages = props => {
  return (
    <Fragment>
      <Grid item xs={12} md={6}>
        <ChatList />
      </Grid>
      <Grid item xs={12} md={6}>
        <Chat />
      </Grid>
    </Fragment>
  );
};

DirectMessages.propTypes = {};

export default DirectMessages;
