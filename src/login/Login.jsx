import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import defaultTheme from "../configuration/defaultTheme";
import Notification from "./Notification";
import LoginForm from "./LoginForm";
import RegisterForm from "./Register";
import logo from "../common/logo_10.png";

const styles = theme => ({
  paper: {
    marginTop: "12em",
    backgroundColor: "rgb(24, 40, 65)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  root: {
    minWidth: 400,
    backgroundColor: theme.palette.background.paper
  },
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    height: "1px",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "url(https://source.unsplash.com/random/1600x900)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  media: {
    height: 150,
    justifyContent: "center"
  }
});

const sanitizeRestProps = ({
  classes,
  className,
  location,
  title,
  array,
  theme,
  staticContext,
  ...rest
}) => rest;

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, className, loginForm, registerForm } = this.props;
    const { value } = this.state;

    return (
      <div
        className={classnames(classes.main, className)}
        {...sanitizeRestProps(this.props)}
      >
        <Paper className={classes.paper}>
          <img src={logo} className={classes.media} alt="Math Problems" />
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="ACESSAR" />
                <Tab label="CADASTRAR" />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer>{loginForm}</TabContainer>}
            {value === 1 && <TabContainer>{registerForm}</TabContainer>}
          </div>
        </Paper>
        <Notification />
      </div>
    );
  }
}

Login.defaultProps = {
  theme: defaultTheme,
  loginForm: <LoginForm />,
  registerForm: <RegisterForm />
};

export default withStyles(styles)(Login);
