import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import AddFriend from "./AddFriend";
import ConnectionManager from "./ConnectionManager";

const ConnectionsHome = props => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}></Grid>
        <Grid item xs={12} md={5}></Grid>
        <Grid item xs={12} md={4}>
          <AddFriend />
        </Grid>
      </Grid>
    </Fragment>
  );
};

ConnectionsHome.propTypes = {};

export default ConnectionsHome;
