import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Posts from "./Posts";
import PostLists from "./PostLists";
import PostChat from "./PostChat";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  postsRoot: {
    height: "80vh"
  }
}));

const PostHome = props => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <PostChat />
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={classes.postsRoot}>
            <Posts />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

PostHome.propTypes = {};

export default PostHome;
