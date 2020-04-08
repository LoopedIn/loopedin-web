import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { getUserLoopInfo, createLoop, updateLoop } from "../../actions";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary
  }
}));

const ConnectionManagerHome = props => {
  const classes = useStyles();

  const {
    createLoopSuccessFulMsg,
    createLoopFailedMsg,
    loopsWithContactInfo,

    //Methods
    getUserLoopInfo,
    createLoop,
    updateLoop
  } = props;
  
  useEffect(() => {
    getUserLoopInfo();
  }, [getUserLoopInfo]);

  const [newLoop, setNewLoop] = React.useState('');
  const [selectedLoop, setSelectedLoop] = React.useState(Object.keys(loopsWithContactInfo)[0]);
  const [toggle, setToggle] = React.useState(false);
  const [loopVsFriendsConfig, setLoopVsFriendsConfig] = React.useState(loopsWithContactInfo);

  const handleListItemClick = (event, selectedLoop) => {
    setSelectedLoop(selectedLoop);
  };

  const handleCreateLoopBtnSubmit = () => {
    createLoop(newLoop)
  }

  const handleSaveLoopConfigsBtnSubmit = () => {
    updateLoop(loopVsFriendsConfig)
  }

  const renderLoopsListItem = val => {
    return (
      <ListItem
        button
        selected={selectedLoop === val}
        onClick={event => handleListItemClick(event, val)}
      >
        <Paper className={classes.paper} style={{ width: 200 }}>
          {val}
        </Paper>
      </ListItem>
    );
  };

  const handleConfigToggle = (loop, name) => () => {
      let loopConfig = loopVsFriendsConfig[loop]
      loopConfig[name] = !loopConfig[name]
      loopVsFriendsConfig[loop] = loopConfig
      let newToggle = toggle;
      newToggle =! newToggle;
      setToggle(newToggle) 
      setLoopVsFriendsConfig(loopVsFriendsConfig)
  }

  const renderLoopsFriendConfig = loop => {
    const config =
    loopVsFriendsConfig[loop] == undefined
        ? {}
        : loopVsFriendsConfig[loop];
    const list = [];
    Object.keys(config).map((key) => {
      let name = key;
      let isPresent = config[key];
      const labelId = `checkbox-list-label-${name}`;
      list.push(
        <ListItem key={name} role={undefined} button onClick={handleConfigToggle(loop,name)}>
          <Paper className={classes.paper} style={{ width: 200 }}>
          <Checkbox
                edge="start"
                checked={isPresent}
                tabIndex={-5}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            {name}
          </Paper>
        </ListItem>
      );
    });
    return list;
  };

  return (
    <div
      className={classes.root}
      style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
    >
      <Container maxWidth="sm" border={1}>
        <Grid container spacing={3} justify="center" alignItems="center" border={1}>
        <Grid item xs={12} container direction="row" style={{marginTop:20}} border={1}>
            <Grid item xs={5}>
            <TextField id="outlined-basic" 
                label="Loop name" variant="outlined" size="small" 
                onChange={e => setNewLoop(e.target.value)}
                defaultValue={newLoop}/>
                {createLoopSuccessFulMsg}{createLoopFailedMsg}
            </Grid>
            <Grid item xs={5}>
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCreateLoopBtnSubmit}
                  >
                  Create loop
              </Button>
            </Grid>
        </Grid>
        <Grid item xs={6}>
          <List>
            {Object.keys(loopVsFriendsConfig).map(val => renderLoopsListItem(val))}
          </List>
        </Grid>
        <Grid item xs={6}>
          {renderLoopsFriendConfig(selectedLoop)}
        </Grid>
        <Grid item xs={6}>
          <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveLoopConfigsBtnSubmit}
              >
              Save
          </Button>
        </Grid>
        </Grid>
      </Container>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loopsWithContactInfo: state.userConnections.userLoops,
    createLoopSuccessFulMsg:  state.userConnections.createLoopSuccessFulMsg,
    createLoopFailedMsg: state.userConnections.createLoopFailedMsg
  };
}

export default connect(mapStateToProps, {
  getUserLoopInfo,
  createLoop,
  updateLoop
})(ConnectionManagerHome);
