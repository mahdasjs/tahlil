import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./LoginComponent/Login";
import SignUpContainer from "./SignUpComponent/SignUpContainer";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HeadsetIcon from "@material-ui/icons/Headset";
import homepage from "./homepage";
import PrivateRoute from "./Utils/PrivateRoute";
import PublicRoute from "./Utils/PublicRoute";
import "./style.css";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = (theme) => ({
  root: {
    flexbasis: 0,
    position: " relative",
    marginTop: 140,
  },
});

class NavTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <BrowserRouter>
        <div className="roxFlex" style={{backgroundColor:'#fff'}}>
          <Grid container direction="column" spacing={0}>
            <Grid item xs>
              <div className="newbox">
                <br />
                <h1 style={{ color: "navy", fontSize: 30 }}>
                  COMU <HeadsetIcon style={{ fontSize: 30 }} />
                </h1>
                <br />
                <br />
                <h2 style={{ color: "grey", fontSize: 20 }}>
                  {" "}
                  Looking for new music?
                </h2>
                <h2 style={{ color: "grey", fontSize: 20 }}>
                  Do you want to find people loving music as much as you?
                </h2>
                <h2 style={{ color: "grey", fontSize: 20 }}> let's start!</h2>
              </div>
            </Grid>
            <img
              style={{
                height: "60%",
                width: "70%",
                marginTop: "-30px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              alt="bg"
              src="bg.jpg"
            />
          </Grid>
          <NoSsr className="roxSignUpLoginContainer">
            <Paper className="fakingroot" elevation={0}>
              <AppBar position="static">
                <Tabs
                  tabItemContainerStyle={{ bottom: "4" }}
                  style={{ background: " rgb(48,63,159, 0.8)" }}
                  variant="fullWidth"
                  value={value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  aria-label="full width tabs
                    example"
                  centered
                >
                  <Tab label="Login" component={Link} to="/" />
                  <Tab label="SignUp" component={Link} to="/SignUp" />
                </Tabs>
              </AppBar>

              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/SignUp" component={SignUpContainer} />
                <Route path="/homepage" component={homepage} />
              </Switch>
            </Paper>
          </NoSsr>
        </div>

        {/* </Grid> */}
        {/* </Grid> */}
      </BrowserRouter>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
