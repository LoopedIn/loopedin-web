import React, { useState, Fragment, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { removeLoginToastMessage } from "../../actions/auth";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        LoopedIn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  overrides: {
    MuiSvgIcon: {
      root: {
        fontSize: "1rem"
      }
    }
  },
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/umRPY9w3q1c/1600x900)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
}));

const CustomSignInSVG = withStyles({
  root: {
    fontSize: "1rem"
  }
})(LockOutlinedIcon);

const LoginSide = props => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginError, isAuthenticated, loginUser } = props;

  const handleSubmit = () => {
    loginUser(email, password);
  };

  const { loginToast, removeLoginToastMessage } = props;

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    removeLoginToastMessage();
  };

  const [toastMessagesState, setToastMessageState] = useState(loginToast);

  useEffect(() => {
    setToastMessageState(loginToast);
    if (loginToast != undefined) {
      setOpen(true);
    }
  }, [loginToast]);

  const toast = (message, severity) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  const severity = () => {
    return "info";
  };

  const toastToShow = () =>
    toastMessagesState ? (
      toast(toastMessagesState, severity(toastMessagesState))
    ) : (
      <div></div>
    );

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Fragment>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Grid container>
                <Grid item>
                  <Typography component="h1" variant="h3">
                    LoopedIn - 3
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Avatar className={classes.avatar}>
                    <CustomSignInSVG />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              {loginError && (
                <Typography component="p" className={classes.errorText}>
                  Incorrect email or password.
                </Typography>
              )}
              <Grid container>
                <Grid item>
                  <Link component={RouterLink} to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </div>
          </Grid>
        </Grid>
        <Box>{toastToShow()}</Box>
      </Fragment>
    );
  }
};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginToast: state.auth.loginToast,
    isAuthenticated: state.auth.isAuthenticated
  };
}
export default connect(mapStateToProps, { removeLoginToastMessage, loginUser })(
  LoginSide
);
