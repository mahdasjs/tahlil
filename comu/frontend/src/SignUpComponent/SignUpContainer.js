import React, { Component } from "react";
import SignUpForm from "./SignUpForm.js";
import Cookie from "js-cookie";

const axios = require("axios");
const FormValidators = require("../validate");
const zxcvbn = require("zxcvbn");
const validateSignUpForm = FormValidators.validateSignUpForm;
class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        pwconfirm: "",
      },
      btnTxt: "show",
      type: "password",
      score: "0",
      errormassage: "provide require information",
    };

    this.pwMask = this.pwMask.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange = async (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    await this.setState({
      user,
    });
  };

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
    });

    if (event.target.value === "") {
      this.setState((state) =>
        Object.assign({}, state, {
          score: "null",
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState((state) =>
        Object.assign({}, state, {
          score: pw.score + 1,
        })
      );
    }
  }

  submitSignup(user) {
    var params = {
      first_name: user.frs,
      last_name: user.lsy,
      username: user.usr,
      password1: user.pw,
      password2: user.pwconfirm,
      email: user.email,
    };

    axios
      .post(
        "http://localhost:8000/api/v1/accounts/rest-auth/registration/ ",
        params
      )
      .then(function (response) {})
      .then((response) => {
        Cookie.set('token',response.data.token);
        Cookie.set('userid',response.data.id)
        Cookie.set('username',response.data.username)
        window.location = "/homepage";

      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            errors: error.response.data,
          });
        } else {
          window.location = "/homepage";

        }
      });
  }

  validateForm(event) {
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {},
      });
      var user = {
        usr: this.state.user.username,
        frs: this.state.user.firstname,
        lsy: this.state.user.lastname,
        pw: this.state.user.password,
        pwconfirm: this.state.user.pwconfirm,
        email: this.state.user.email,
      };
      this.submitSignup(user);
    } else {
      const errors = payload.errors;
      this.setState({
        errors,
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState((state) =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show",
      })
    );
  }

  render() {
    return (
      <div style={{ backgroundColor: "#fff" }}>
        <SignUpForm
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          onSubmit={this.validateForm}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
          errormassage={this.state.errormassage}
        />
      </div>
    );
  }
}

export default SignUpContainer;
