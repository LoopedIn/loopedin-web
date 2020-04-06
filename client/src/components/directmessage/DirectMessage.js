import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Chat from "./Chat";
import ChatList from "./ChatList";
<<<<<<< HEAD
=======
import Input from "./InputText";
>>>>>>> feature/suhan-front-end

const DirectMessages = props => {
  return (
    <Fragment>
<<<<<<< HEAD
      <Grid item xs={12} md={6}>
        <ChatList />
      </Grid>
      <Grid item xs={12} md={6}>
        <Chat />
=======
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChatList />
        </Grid>
        <Grid item xs={12} md={8}>
          <div>
            <Chat />
            <Input />
          </div>
        </Grid>
>>>>>>> feature/suhan-front-end
      </Grid>
    </Fragment>
  );
};

DirectMessages.propTypes = {};

export default DirectMessages;
