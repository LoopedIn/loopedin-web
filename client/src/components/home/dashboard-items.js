import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PermIdentityRoundedIcon from "@material-ui/icons/PermIdentityRounded";
import TollRoundedIcon from "@material-ui/icons/TollRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import { DIRECT_MESSAGE, POSTS, SIGN_OUT } from "../../utils/ui-constants";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <TollRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={POSTS} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EmailRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={DIRECT_MESSAGE} />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <PermIdentityRoundedIcon />
      </ListItemIcon>
      <ListItemText primary={SIGN_OUT} />
    </ListItem>
  </div>
);
