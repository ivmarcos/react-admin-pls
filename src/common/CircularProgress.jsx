import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class CustomCircularProgress extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
}

export default withStyles(styles)(CustomCircularProgress);
