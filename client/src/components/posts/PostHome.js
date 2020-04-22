import React, { Fragment } from "react";
import Posts from "./Posts";
import PostChat from "./PostChat";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  postsRoot: {
    height: "80vh"
  }
}));

const PostHome = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <PostChat />
        </Grid>
        <Grid item xs={12} md={7}>
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
