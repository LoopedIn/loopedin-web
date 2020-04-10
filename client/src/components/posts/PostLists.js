import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
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
import Scrollbar from "../../utils/Scrollbar";
import { getUserLoopInfo } from "../../actions/user-connections";
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
  },
  scrollbar: {
    width: "100%",
    height: "33vh"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light
  }
}));

const PostLists = props => {
  const classes = useStyles();
  const { loopsInfo, getUserLoopInfo } = props;
  const [checked, setChecked] = React.useState([1]);
  const [loopList, setLoopList] = useState(Object.keys(loopsInfo));

  useEffect(() => {
    getUserLoopInfo();
  }, [loopList]);

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

  const renderLoopList = (value, index) => {
    const labelId = `checkbox-list-secondary-label-${value}`;
    return (
      <div>
        <ListItem key={index} button>
          <ListItemAvatar>
            <Avatar aria-label="loop-name" className={classes.avatar}>
              {`${value[0]}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={labelId} primary={`${value}`} />
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              onChange={handleToggle(value)}
              checked={checked.indexOf(value) !== -1}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    );
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
            <div className={classes.scrollbar}>
              <Scrollbar>
                <List dense className={classes.root}>
                  {loopList.map((value, index) => {
                    return renderLoopList(value, index);
                  })}
                </List>
              </Scrollbar>
            </div>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loopsInfo: state.userConnections.userLoops
  };
};

export default connect(mapStateToProps, {
  getUserLoopInfo
})(PostLists);
