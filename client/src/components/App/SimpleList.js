import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import DottedMenu from "./DottedMenu";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  header: {
    marginBottom: 12
  }
});

function renderCards(cards) {
  return cards.map(card => <ListItem button>{card}</ListItem>);
}

function SimpleList(props) {
  const { classes } = props;
  console.log(props);
  return (
    <div className={classes.root}>
      <List
        subheader={
          <ListSubheader disableSticky={true}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Typography variant="h6">
                <p>{props.title}</p>
              </Typography>
              <DottedMenu />
            </div>
          </ListSubheader>
        }
      >
        {renderCards(props.cards)}
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleList);
