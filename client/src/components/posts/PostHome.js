import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Posts from "./Posts";
import MyPosts from "./MyPosts";
import PostChat from "./PostChat";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  postsRoot: {
    height: "80vh"
  }
}));

const PostHome = props => {
  const classes = useStyles();

  const [textInput, setTextInput] = useState("adsad");

  const textCallback = input => {
    console.log(input);
    setTextInput(input);
  };

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <PostChat parentCallback={textCallback} />
          <MyPosts />
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
