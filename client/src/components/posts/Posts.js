import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getUserPosts } from "../../utils/posts";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Post from "./Post";
import { red } from "@material-ui/core/colors";
import ScrollBar from "../../utils/Scrollbar";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "matchParent"
  },
  scrollbar: {
    width: "100%"
  }
}));

const Posts = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [posts, setItems] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getUserPosts().then(
      result => {
        console.log(result);
        setIsLoaded(true);
        console.log(result);
        setItems(result.posts);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ScrollBar className={classes.scrollbar}>
        <List dense className={classes.root}>
          {posts != undefined ? (
            posts.map((value, index) => {
              return (
                <Post
                  message={value.message}
                  firstName={value.firstName}
                  lastName={value.lastName}
                  timeStamp={value.timeStamp}
                />
              );
            })
          ) : (
            <div></div>
          )}
        </List>
      </ScrollBar>
    );
  }
};

Posts.propTypes = {};

export default Posts;
