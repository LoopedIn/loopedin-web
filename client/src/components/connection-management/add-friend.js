import React, { useEffect, Fragment, useState } from "react";
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
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import {getUserFriends } from "../../actions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper_add_users_card: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  paper_users: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    width: innerWidth
  }
}));

const AddFriend = props => {
  const classes = useStyles();

  const {
    addFriendErrMsg,
    usersFriends,
    getUserFriends
  } = props;

  useEffect(() => {
    getUserFriends();
  }, [getUserFriends]);

  const [newUser, setNewUser] = React.useState('');

  const handleBtnSubmit = () => {
    
  }

  const renderFriendsList = (friend) => {
    return (
      <ListItem>
        <Paper className={classes.paper_users} style={{ width: 200 }}>
          {friend}
        </Paper>
      </ListItem>
    );
  }

  return (
    <Grid container spacing={5} style={{ backgroundColor: "#cfe8fc", padding: 100 }} justify="center">
      {/* Main grid */}
      <Grid item xs={3}>
          <Paper className={classes.paper_add_users_card}>
            <Grid container>
              <Grid item xs={12} style={{textAlign: "left"}}>
                <Typography variant="h6">
                  Add more friends here!!
                </Typography>
              </Grid>
              <Grid item xs={12} style={{marginTop: 10}}>
                <TextField id="outlined-basic" 
                label="Your friend's username" style={{width: 250}} variant="outlined" size="small" 
                onChange={e => setNewUser(e.target.value)}
                defaultValue={newUser}/>
              </Grid>
              <Grid item xs={6} style={{marginTop: 15}} >
                {addFriendErrMsg}
              </Grid>
              <Grid item xs={6} style={{marginTop: 15}} >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleBtnSubmit}
                    >
                    Add friend
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <List>
          {usersFriends.map(val => renderFriendsList(val))}
          </List>
        </Grid>
    </Grid>
)
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    usersFriends: state.userConnections.userFriends
  };
}

export default connect(mapStateToProps, {
  getUserFriends
})(AddFriend);
