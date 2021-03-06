import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Box } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ReplyIcon from "@material-ui/icons/Reply";
import Linkify from "react-linkify";
import InputText from "../directmessage/InputText";

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
    marginLeft: "auto",
    width: "100%"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  },
  cardContentInner: {
    marginTop: theme.spacing(-4)
  },
  boxElevation: {
    boxShadow: "0px 0px 0px 0px"
  },
  replyButtonTransform: {
    transform: "rotate(0deg) !important"
  },
  expandIcon: {
    "&$expanded": {
      transform: "rotate(0deg)"
    }
  },
  replyIconColor: {
    color: theme.palette.tertiary.main
  },
  contentColor: {
    color: theme.palette.textPrimary
  }
}));

var decodeEntities = (function() {
  var cache = {},
      character,
      e = document.createElement('div');
  
  return function(html) {
    return html.replace(/([&][^&; ]+[;])/g, function(entity) {
      character = cache[entity];
			if (!character) {
        e.innerHTML = entity;
        if (e.childNodes[0])
          character = cache[entity] = e.childNodes[0].nodeValue;
        else
          character = '';
      }
      return character;
    });
  };
})();

const useStyleForReply = makeStyles(() => ({
  expandIcon: {
    "&$expanded": {
      transform: "rotate(0deg)"
    }
  },
  expanded: {}
}));

const Post = props => {
  const classes = useStyles();
  const replyClasses = useStyleForReply();
  const { message, firstName, lastName, timeStamp, senderId, postId } = props;

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
          <Typography
            variant="body1"
            className={classes.contentColor}
            component="p"
          >
            <Linkify componentDecorator={componentDecorator}>{decodeEntities(message)}</Linkify>
          </Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        {/* <IconButton className={classes.reply} aria-label="reply">
          <ReplyIcon />
        </IconButton> */}
        <div style={{ width: "100%" }}>
          <ExpansionPanel
            classes={{
              root: classes.boxElevation
            }}
          >
            <ExpansionPanelSummary
              aria-label="reply"
              classes={replyClasses}
              expandIcon={<ReplyIcon className={classes.replyIconColor} />}
            ></ExpansionPanelSummary>
            <InputText
              textBoxHeight="50px"
              sendFunction="handleSendPostReply"
              senderId={senderId}
              postId={postId}
            />
          </ExpansionPanel>
        </div>
      </CardActions>
    </Card>
  );
};

Post.propTypes = {};
export default Post;
