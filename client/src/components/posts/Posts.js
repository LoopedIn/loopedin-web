import React, { Fragment } from "react";
import PropTypes from "prop-types";
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const posts = [
    {
      message:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      loopName: "Loop 1",
      timeStamp: "September 14, 2016"
    },
    {
      message:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      loopName: "Loop 1",
      timeStamp: "September 14, 2017"
    },
    {
      message:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      loopName: "Loop 1",
      timeStamp: "September 14, 2017"
    },
    {
      message:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      loopName: "Loop 1",
      timeStamp: "September 14, 2017"
    },
    {
      message:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      loopName: "Loop 1",
      timeStamp: "September 14, 2017"
    },
    {
      message:
        "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      loopName: "Loop 1",
      timeStamp: "September 14, 2017"
    }
  ];

  return (
    <ScrollBar className={classes.scrollbar}>
      <List dense className={classes.root}>
        {posts.map((value, index) => {
          return (
            <Post
              message={value.message}
              loopName={value.loopName}
              timeStamp={value.timeStamp}
            />
          );
        })}
      </List>
    </ScrollBar>
  );
};

Posts.propTypes = {};

export default Posts;
