import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';



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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const loopsListMockData = ["loop1", "loop2", "loop3"];

const loopsVsFriendsMockData = {
  loop1: {
    friend1: true,
    friend2: true,
    friend3: true
  },
  loop2: {
    friend1: true,
    friend2: false,
    friend3: true
  },
  loop3: {
    friend1: false,
    friend2: false,
    friend3: false
  }
};

const ConnectionManagerHome = props => {
  const classes = useStyles();
  const [selectedLoop, setSelectedLoop] = React.useState(loopsListMockData[0]);
  const [toggle, setToggle] = React.useState(false);
  const [loopVsFriendsConfig, setLoopVsFriendsConfig] = React.useState(loopsVsFriendsMockData);

  const handleListItemClick = (event, selectedLoop) => {
    setSelectedLoop(selectedLoop);
  };

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
      console.log(name)
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
    console.log("Rendering friends")
    Object.keys(config).map((key, index) => {
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
      <Container maxWidth="sm">
        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <List>
              {loopsListMockData.map(val => renderLoopsListItem(val))}
            </List>
          </Grid>
          <Grid item xs={6}>
            {renderLoopsFriendConfig(selectedLoop)}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default connect(null)(ConnectionManagerHome);
