import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import AddFriend from "./AddFriend";
import ConnectionManager from "./ConnectionManager";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {removeToastMessages} from "../../actions/user-connections"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ConnectionsHome = props => {
  const [open, setOpen] = React.useState(true);

  const {
    toastMessages,
    removeToastMessages
  } =  props;

  const handleClose = (event, reason) => {  
    setOpen(false);
    removeToastMessages();
  };
  const [toastMessagesState, setToastMessageState] = useState(toastMessages.reverse());

  console.log({toastMessagesState})
  useEffect(() => {
    setToastMessageState(toastMessages.reverse())
    if(toastMessages.length > 0){
      setOpen(true);
    }
  }, [toastMessages])

  const toast = (message, severity) => 
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>



  const severity = (message) => {
    if(message.includes("already a friend") || message.includes("error") || message.includes("does not exist")){
      return "warning"
    } else{
      return "success"
    }
  }

  const toastToShow = () => 
    toastMessages && toastMessages.length > 0 ?
    toast(toastMessages[0], severity(toastMessages[0]))
       : <div></div>

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ConnectionManager />
        </Grid>
        <Grid item xs={12} md={5}>
          <AddFriend />
        </Grid>
      </Grid>
      {toastToShow()}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    toastMessages: state.userConnections.toastMessages,
  };
}

export default connect(mapStateToProps,{removeToastMessages})(ConnectionsHome);
