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
import { red } from "@material-ui/core/colors";
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
    backgroundColor: red[500]
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
  }
}));

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
              expandIcon={<ReplyIcon />}
            ></ExpansionPanelSummary>
            <InputText />
          </ExpansionPanel>
        </div>
      </CardActions>
    </Card>
  );
};

Post.propTypes = {};
export default Post;
