import React, { Fragment } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Box,
  IconButton
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";

const MyPosts = () => {
  const loops = [1, 2, 3, 4, 5];
  const renderMyPost = (value, index) => {
    return (
      <div key={value}>
        {" "}
        <ListItem>
          <ListItemText
            primary="Single-line item"
            secondary={"Secondary text"}
          />
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
            {loops !== undefined ? (
              loops.map((value, index) => {
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

export default MyPosts;
