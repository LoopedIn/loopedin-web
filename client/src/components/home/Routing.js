import React from "react";
import { Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Posts from "../posts/PostHome";
import DirectMessages from "../directmessage/DirectMessage";
import ConnectionHome from "../connection-management/ConnectionsHome";
import PropsRoute from "../../utils/PropsRoute";

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "85%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "80%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  wrapperMain: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

const Routing = props => {
  const classes = useStyles();
  return (
    <div className={classes.wrapperMain}>
      <Switch>
        <PropsRoute path="/manageconnection" component={ConnectionHome} />
        <div className={classes.wrapper}>
          <PropsRoute path="/posts" component={Posts} />
          <PropsRoute
            path="/directmessage"
            component={DirectMessages}
            socket={props.socket}
          />
        </div>
      </Switch>
    </div>
  );
};

Routing.propTypes = {};

export default Routing;
