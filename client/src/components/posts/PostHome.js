import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Posts from "./Post";
import PostLists from "./PostLists";
import { Grid } from "@material-ui/core";

const PostHome = props => {
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12} md={6}>
          <Posts />
        </Grid>
        <Grid item xs={12} md={6}>
          <PostLists />
        </Grid>
      </Grid>
    </Fragment>
  );
};

PostHome.propTypes = {};

export default PostHome;
