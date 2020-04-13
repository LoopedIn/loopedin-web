import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Card, Box } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReplyIcon from "@material-ui/icons/Reply";
import Linkify from "react-linkify";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  reply: {
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  cardContentInner: {
    marginTop: theme.spacing(-4)
  }
}));

const handleExpandClick = () => {
  setExpanded(!expanded);
};

const Post = props => {
  const classes = useStyles();
  const { message, firstName, lastName, timeStamp } = props;

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  return (
    <Card>
      <Box pt={2} px={2} pb={4}>
        <Box display="flex" justifyContent="space-between">
          <CardHeader
            avatar={
              <Avatar aria-label="username" className={classes.avatar}>
                {firstName.charAt(0) + lastName.charAt(0)}
              </Avatar>
            }
            title={firstName + " " + lastName}
            subheader={timeStamp}
          />
        </Box>
      </Box>

      <CardContent>
        <Box className={classes.cardContentInner} height="50px">
          <Typography variant="body2" color="textSecondary" component="p">
            <Linkify componentDecorator={componentDecorator}>{message}</Linkify>
          </Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={classes.reply}
          onClick={handleExpandClick}
          aria-label="reply"
        >
          <ReplyIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

Post.propTypes = {};
export default Post;
