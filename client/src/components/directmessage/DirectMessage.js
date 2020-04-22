import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Chat from "./Chat";
import ChatList from "./ChatList";
import Input from "./InputText";

const DirectMessages = props => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChatList />
        </Grid>
        <Grid item xs={12} md={8}>
          <div>
            <Chat socket={props.socket} />
            <Input />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

DirectMessages.propTypes = {};

export default DirectMessages;
