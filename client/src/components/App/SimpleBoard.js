import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  board: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  }
});

function PaperSheet(props) {
  const { classes } = props;

  return <div className={classes.board}>{props.lists}</div>;
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);
