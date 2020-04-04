import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import { Button, Toolbar, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  toolbar: {
    justifyContent: "space-between"
  },
  paperRoot: {
    marginTop: "5px"
  }
}));

const PostLists = props => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const listArray = [0, 1, 2, 3];
  const listArrayLen = listArray.length;

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Fragment>
      <Paper>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" className="header-message">
            Loops
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<SendIcon>send</SendIcon>}
          >
            Send
          </Button>
        </Toolbar>
      </Paper>
      <Paper className={classes.paperRoot}>
        <Box pt={2} px={2} pb={4}>
          <Box display="flex" justifyContent="space-between">
            <List dense className={classes.root}>
              {listArray.map((value, index) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <div>
                    <ListItem key={value} button>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar n°${value + 1}`}
                          src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        id={labelId}
                        primary={`Loop Name ${value + 1}`}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value)}
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index === listArrayLen - 1 ? (
                      <div></div>
                    ) : (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                );
              })}
            </List>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

PostLists.propTypes = {};

export default PostLists;
