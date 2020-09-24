/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import Button from "components/logincomponents/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="login"
          title="Click here to login"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="#ffffff"
            className={classes.navLink}
          >
            <Link href="/admin/login">
              Login
            </Link>
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
