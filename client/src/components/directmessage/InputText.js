import React from "react";
import PropTypes from "prop-types";
import { Input, makeStyles } from "@material-ui/core";
import Send from "@material-ui/icons/Send";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    alignItems: "row",
    justifyContent: "center",
    height: 10,
    backgroundColor: theme.palette.background.main,
    margin: 5,
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15
  },
  inputBox: {
    backgroundColor: theme.palette.grey[400],
    flexGrow: 1,
    height: 56,
    borderRadius: 30,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 5
  }
}));

const handleSendMessage = () => {};

const InputText = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className={classes.inputBox}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%"
            }}
          >
            <Input
              id="message"
              style={{
                position: "absolute",
                height: 42,
                width: "calc(100% - 72px)",
                lineHeight: undefined,
                top: -6,
                left: 15,
                right: 50
              }}
              multiline
              rowsMax="2"
              disableUnderline={true}
              onChange={e => {}}
              fullWidth={true}
              autoFocus
              autoComplete="off"
              placeholder="Write Message..."
              onKeyDown={e => {}}
              ref={field => {}}
              type="Text"
            />
          </div>
        </div>
        <Fab
          color={"primary"}
          onClick={() => handleSendMessage()}
          aria-label="send"
        >
          <Send />
        </Fab>
      </div>
    </div>
  );
};

InputText.propTypes = {};

export default InputText;
