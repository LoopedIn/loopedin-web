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
import { getLoopLists, sendLoopMessage } from "../../actions/user-connections";
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
  const {
    loopsList,
    getLoopLists,
    postText,
    parentCallback,
    disableButton
  } = props;

  const [checked, setChecked] = useState([]);
  const [loopsListState, setloopsListState] = useState(loopsList);

  useEffect(() => {
    getLoopLists();
  }, [getLoopLists]);

  useEffect(()=> setloopsListState(loopsList), [loopsList])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    newChecked.length != 0 ? parentCallback(false) : parentCallback(true);

    setChecked(newChecked);
  };

  const sendMessageToLoop = e => {
    e.preventDefault();
    //console.log(loopList);
  };

  const renderLoopList = (value, index) => {
    const labelId = `checkbox-list-secondary-label-${value[0]}`;
    return (
      <div key={value.loopId}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar aria-label="loop-name" className={classes.avatar}>
              {`${value.loopName[0]}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText id={labelId} primary={`${value.loopName}`} />
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
            onClick={sendMessageToLoop}
            disabled={disableButton}
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
                  {loopsListState !== undefined ? (
                    loopsListState.map((value, index) => {
                      return renderLoopList(value, index);
                    })
                  ) : (
                    <div></div>
                  )}
                </List>
              </Scrollbar>
            </div>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    postText: ownProps.postText,
    parentCallback: ownProps.parentCallback,
    disableButton: ownProps.disableButton,
    user: state.auth.user,
    loopsList: state.userConnections.loopLists
  };
};

export default connect(mapStateToProps, {
  getLoopLists,
  sendLoopMessage
})(PostLists);
