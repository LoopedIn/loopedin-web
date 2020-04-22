import React, { useEffect } from "react";
import { getUserPosts } from "../../utils/posts";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Post from "./Post";
import ScrollBar from "../../utils/Scrollbar";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: "matchParent"
  },
  scrollbar: {
    width: "100%"
  }
}));

const Posts = () => {
  const classes = useStyles();
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [posts, setItems] = React.useState([]);
  //const [socket] = useSocket('http://localhost:3000');

  const loadUserPosts = () =>
    getUserPosts().then(
      result => {
        //console.log(result);
        setIsLoaded(true);
        //console.log(result);
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

  useEffect(() => {
    //console.log("here ")
    loadUserPosts();
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
            posts.map(value => {
              return (
                <Post
                  key={value.created}
                  message={value.postContent}
                  firstName={value.firstName}
                  lastName={value.lastName}
                  timeStamp={moment(value.created).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
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
