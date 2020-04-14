import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Scrollbar from "../../utils/Scrollbar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Fab } from "@material-ui/core";
import { getUserLoopInfo, createLoop, updateLoop } from "../../actions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  marginEle: {
    justifyContent: "center",
    marginTop: "10px"
  },
  scrollBar: {
    width: "50%",
    height: "62vh"
  },
  paper: {
    padding: theme.spacing(1),
    width: "100%",
    textAlign: "left",
    color: theme.palette.text.primary
  },
  addFAB: {
    alignSelf: "flex-end"
  },
  scrollBarFriend: {
    width: "100%",
    height: "80vh"
  }
}));

const ConnectionManagerHome = props => {
  const classes = useStyles();

  const {
    createLoopSuccessFulMsg,
    createLoopFailedMsg,
    loopsWithContactInfo,
    friendsList,

    //Methods
    getUserLoopInfo,
    createLoop,
    updateLoop
  } = props;

  useEffect(() => {
    getUserLoopInfo();
  }, [getUserLoopInfo]);

  const [newLoop, setNewLoop] = useState("");

  const [selectedLoop, setSelectedLoop] = useState(
    loopsWithContactInfo.length === 0 ? "" : Object.keys(loopsWithContactInfo)[0]
  );
  
  const [toggle, setToggle] = useState(false);

  const [loopVsFriendsConfig, setLoopVsFriendsConfig] = useState(
    loopsWithContactInfo
  );
    
 useEffect(() => {setLoopVsFriendsConfig(loopsWithContactInfo)}, [loopsWithContactInfo])
 
  const handleListItemClick = (event, selectedLoop) => {
    setSelectedLoop(selectedLoop);
  };

  const handleCreateLoopBtnSubmit = () => {
    createLoop(newLoop);
    window.location.reload(true);
  };

  const handleSaveLoopConfigsBtnSubmit = () => {
    updateLoop(loopVsFriendsConfig, friendsList);
  };

  const renderLoopsListItem = (val, index) => {
    return (
      <div>
        <ListItem
          alignItems="flex-start"
          button
          selected={selectedLoop === val}
          onClick={event => handleListItemClick(event, val)}
        >
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {val}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>

        <Divider variant="inset" component="li" />
      </div>
    );
  };

  const handleConfigToggle = (loop, name) => () => {
    let loopConfig = loopVsFriendsConfig[loop];
    loopConfig[name] = !loopConfig[name];
    loopVsFriendsConfig[loop] = loopConfig;
    let newToggle = toggle;
    newToggle = !newToggle;
    setToggle(newToggle);
    setLoopVsFriendsConfig(loopVsFriendsConfig);
  };

  const renderLoopsFriendConfig = loop => {
    const config =
      loopVsFriendsConfig[loop] == undefined ? {} : loopVsFriendsConfig[loop];
    const list = [];
    Object.keys(config).map(key => {
      let name = key;
      let isPresent = config[key];
      const labelId = `checkbox-list-label-${name}`;
      list.push(
        <ListItem
          key={name}
          role={undefined}
          button
          onClick={handleConfigToggle(loop, name)}
        >
          <Paper className={classes.paper}>
            <Checkbox
              edge="start"
              checked={isPresent}
              tabIndex={-5}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            />
            {name}
          </Paper>
        </ListItem>
      );
    });
    return list;
  };

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-evenly">
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        flexGrow="2"
      >
        <div>
          <TextField
            id="outlined-basic"
            label="Loop name"
            variant="outlined"
            size="small"
            onChange={e => setNewLoop(e.target.value)}
            value={newLoop}
          />
        </div>
        <div className={classes.marginEle}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateLoopBtnSubmit}
          >
            Create loop
          </Button>
        </div>
        <div className={classes.marginEle}>
          {createLoopSuccessFulMsg ? (
            <div>{createLoopSuccessFulMsg}</div>
          ) : (
            <div></div>
          )}
          {createLoopFailedMsg ? <div>{createLoopFailedMsg}</div> : <div></div>}
        </div>
        <div className={classes.scrollBar}>
          <Scrollbar>
            <List>
              {Object.keys(loopVsFriendsConfig).map((val, index) =>
                renderLoopsListItem(val, index)
              )}
            </List>
          </Scrollbar>
        </div>
        <div className={classes.addFAB}>
        <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveLoopConfigsBtnSubmit}
            >
            Save
        </Button>
          {/* <Fab color="secondary" onClick={() => {}}>
            <AddCircleIcon className="material-icons" />
          </Fab> */}
        </div>
      </Box>
      <Box display="flex" flexDirection="column" flexGrow="2">
        <div className={classes.scrollBarFriend}>
          <Scrollbar>
            <List>{renderLoopsFriendConfig(selectedLoop)}</List>
          </Scrollbar>
        </div>
      </Box>
    </Box>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loopsWithContactInfo: state.userConnections.userLoops,
    createLoopSuccessFulMsg: state.userConnections.createLoopSuccessFulMsg,
    createLoopFailedMsg: state.userConnections.createLoopFailedMsg,
    friendsList: state.userConnections.friendsList
  };
}

export default connect(mapStateToProps, {
  getUserLoopInfo,
  createLoop,
  updateLoop
})(ConnectionManagerHome);
