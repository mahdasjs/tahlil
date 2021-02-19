import "./styleLogin.css";
import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import axios from "axios";
import * as yup from "yup";
import Cookie from 'js-cookie'

export default class Login extends React.Component {
  validationSchema = yup.object().shape({
    email: yup.string().required("enter a email").label("email"),
    password: yup.string().required("enter a password").label("password"),
  });

  state = {
    loading: false,
    emailError: false,
    passwordError: false,
    errorForEmail: false,
    errorForPassword: false,
    errormassage:null,
    user: { email: "", password: "" },
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ user: { ...this.state.user, [name]: value } });
  };
  handleLogin = async () => {
    this.setState({ loading: true });
    if (!this.state.user.email) {
      this.setState({ loading: false });
      this.setState({ emailError: true });
    }
    if (!this.state.user.password) {
      this.setState({ loading: false });
      this.setState({ passwordError: true });
    }

    if (this.state.user.email && this.state.user.password) {
      if (this.state.user.email.includes("@" && ".com")) {
        if (this.state.user.password.length >= 8) {
          axios
            .post(
              "http://localhost:8000/api/v1/accounts/login/",
              this.state.user
            )
            .then((response) => {
              this.setState({ loading: true });
              this.setState({ emailError: false });
              this.setState({ passwordError: false });
              Cookie.set('token',response.data.token);
              Cookie.set('userid',response.data.id)
              Cookie.set('username',response.data.username)
              window.location = "/homepage";
              // this.props.history.push("/homepage");
              // window.location.reload();
            })
            .catch((error) => {
              if (error.response) {

              this.setState({ loading: false
                ,errormassage:error.response.data
               });
              }
            });
        } else {
          console.log(this.state.user)
          this.setState({ loading: false });
          this.setState({ errorForPassword: true });
        }
      } else {
        this.setState({ loading: false });
        this.setState({ errorForEmail: true });
      }
    } else {
      this.setState({ loading: false });
      this.setState({ emailError: true });
      this.setState({ passwordError: true });
    }
  };

  render() {
    return (
      <div className="logBox">
        <h1 style={{ color: "navy" ,fontSize:26}}>
          Login
          <QueueMusicIcon fontSize="small" />
        </h1>

        <form validationSchema={this.validationSchema}>
          <TextField
            type="text"
            name="email"
            onChange={this.handleChange}
            autoComplete="new-password"
            hintText="Enter your email"
            floatingLabelText="email"
            value={this.state.user.email}
          />
          {this.state.emailError ? (
            <div>
              {this.state.errorForEmail ? (
                <p>
                  <small style={{ color: "red" }}>
                    Please enter a valid email
                  </small>
                  <br />
                </p>
              ) : (
                <p>
                  <small style={{ color: "red" }}>Please enter a email</small>
                  <br />
                </p>
              )}
            </div>
          ) : (
            ""
          )}
          {this.state.errormassage?
          <p>
          <small style={{ color: "red" }}>{this.state.errormassage}</small>
          <br />
        </p>
        :null
          }
          <br />
          <TextField
            type="password"
            name="password"
            onChange={this.handleChange}
            autoComplete="new-password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            value={this.state.user.password}
          />
          {this.state.passwordError ? (
            <div>
              {this.state.errorForPassword ? (
                <p>
                  <small style={{ color: "red" }}>
                    Password must have at least 8 characters
                  </small>
                  <br />
                </p>
              ) : (
                <p>
                  <small style={{ color: "red" }}>
                    Please enter a password
                  </small>
                  <br />
                </p>
              )}
            </div>
          ) : (
            ""
          )}
          {this.state.errormassage?
            <p>
            <small style={{ color: "red" }}>
              {this.state.errormassage}
            </small>
            <br />
          </p>
          :null
          }
          <br />
          <RaisedButton
            value={this.state.loading ? "Loading..." : "Login"}
            className="submlog"
            onClick={this.handleLogin}
            disabled={this.state.loading}
            label="Submit"
            inherit={true}
          />
        </form>
      </div>
    );
  }
}
