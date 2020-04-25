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
import { getLoopLists } from "../../actions/user-connections";
import { serverRequests } from "../../api/apiRequests";
import { Button, Toolbar, Paper, Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import classNames from "classnames";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  },
  paperColor: {
    backgroundColor: theme.palette.common.black
  },
  textColor: {
    color: theme.palette.secondary.main
  }
}));

const useStyleForBtnOvr = makeStyles(theme => ({
  root: {
    "&$disabled": {
      color: theme.palette.common.grey
    }
  },
  disabled: {}
}));

const useStyleForCheckBoxOvr = makeStyles(theme => ({
  root: {
    color: theme.palette.tertiary.main,
    "&$checked": {
      color: theme.palette.tertiary.main
    }
  },
  checked: {}
}));

const PostLists = props => {
  const classes = useStyles();
  const classesForBtnOver = useStyleForBtnOvr();
  const classesForCheckBoxOver = useStyleForCheckBoxOvr();
  const {
    loopsList,
    getLoopLists,
    postText,
    parentCallback,
    disableButton,
    parentCallbackForPosts
  } = props;

  const [checked, setChecked] = useState([]);
  const [loopsListState, setloopsListState] = useState(loopsList);

  useEffect(() => {
    getLoopLists();
  }, [getLoopLists]);

  useEffect(() => setloopsListState(loopsList), [loopsList]);

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

  const sendMessageToLoop = async e => {
    e.preventDefault();
    let loopIdsSelected = [];
    checked.forEach(checkedEle => {
      loopIdsSelected.push(checkedEle.loopId);
    });
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await serverRequests.sendLoopMessage(
        postText,
        loopIdsSelected
      );
      parentCallbackForPosts(Date.now());
      setOpen(true);
    } catch (error) {
      //console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const toast = (message, severity) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  const toastToShow = () => toast("Sent post", "success");

  const renderLoopList = value => {
    const labelId = `checkbox-list-secondary-label-${value[0]}`;
    return (
      <div key={value.loopId}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar aria-label="loop-name" className={classes.avatar}>
              {`${value.loopName[0]}`}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            className={classes.textColor}
            id={labelId}
            primary={`${value.loopName}`}
          />
          <ListItemSecondaryAction>
            <Checkbox
              edge="end"
              classes={classesForCheckBoxOver}
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
      <Paper className={classes.paperColor}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.textColor}>
            Loops
          </Typography>

          <Button
            variant="contained"
            color="primary"
            classes={classesForBtnOver}
            onClick={sendMessageToLoop}
            disabled={disableButton}
            endIcon={<SendIcon>send</SendIcon>}
          >
            Send
          </Button>
        </Toolbar>
      </Paper>
      <Paper className={classNames(classes.paperRoot, classes.paperColor)}>
        <Box pt={2} px={2} pb={4}>
          <Box display="flex" justifyContent="space-between">
            <div className={classes.scrollbar}>
              <Scrollbar>
                <List
                  dense
                  className={classNames(classes.root, classes.paperColor)}
                >
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
      {toastToShow()}
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    postText: ownProps.postText,
    parentCallback: ownProps.parentCallback,
    parentCallbackForPosts: ownProps.parentCallbackForPosts,
    disableButton: ownProps.disableButton,
    user: state.auth.user,
    loopsList: state.userConnections.loopLists
  };
};

export default connect(mapStateToProps, {
  getLoopLists
})(PostLists);
