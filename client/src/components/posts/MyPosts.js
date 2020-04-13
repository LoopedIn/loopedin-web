import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Box,
  IconButton
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import { getMyLoopsMessages } from "../../actions/user-connections";

const MyPosts = props => {
  const { getMyLoopsMessages, myPostList } = props;

  const [myPostMessageList, setMyPostMessageList] = useState(myPostList);

  useEffect(() => {
    getMyLoopsMessages();
  }, [getMyLoopsMessages]);

  useEffect(() => {
    setMyPostMessageList(myPostList);
  }, [myPostList]);

  const renderMyPost = (value, index) => {
    return (
      <div key={value._id}>
        <ListItem key={value}>
          <ListItemText primary={value.postContent} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="middle" component="li" />
      </div>
    );
  };
  return (
    <Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" className="header-message">
            My posts
          </Typography>
        </ExpansionPanelSummary>

        <Box width="100%">
          <List>
            {" "}
            {myPostMessageList !== undefined ? (
              myPostMessageList.map((value, index) => {
                return renderMyPost(value, index);
              })
            ) : (
              <div></div>
            )}
          </List>
        </Box>
      </ExpansionPanel>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    myPostList: state.userConnections.postsLists
  };
};

export default connect(mapStateToProps, { getMyLoopsMessages })(MyPosts);
