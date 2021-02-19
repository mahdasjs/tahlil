import React from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import PasswordStr from "./PasswordStr";
import { Link } from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import "./style.css";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange,
}) => {
  return (
    <div className="loginBox" style={{ backgroundColor: "#fff"}}>
      <h1 style={{ color: "navy",fontSize:26 }}>
        Sign Up
        <QueueMusicIcon fontSize="small" />
      </h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          className="nam"
          name="firstname"
          floatingLabelText="firstname"
          value={user.firstname}
          onChange={onChange}
          errorText={errors.firstname}
        />
        <TextField
          className="nam"
          margin="dense"
          name="lastname"
          floatingLabelText="lastname"
          value={user.lastname}
          onChange={onChange}
          errorText={errors.lastname}
        />
        <br />
        <TextField
         className="nam1"
          margin="dense"
          name="username"
          floatingLabelText="user name"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
        />
        <br />
        <TextField
         className="nam1"
          margin="dense"
          size="small"
          name="email"
          floatingLabelText="email"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
        />
        <br />
        <TextField
          className="nam"
          margin="dense"
          size="small"
          type={type}
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
        />
        <TextField
          className="nam"
          type={type}
          name="pwconfirm"
          floatingLabelText="confirm "
          value={user.pwconfirm}
          onChange={onChange}
          errorText={errors.pwconfirm}
        />
        <br />
        <div className="pwStrRow">
          {score >= 1 && (
            <div>
              <PasswordStr score={score} />
              <FlatButton
                className="pwShowHideBtn"
                label={btnTxt}
                onClick={pwMask}
                style={{
                  position: "relative",
                  left: "40%",
                  transform: "translateX(-50%)",
                }}
              />
            </div>
          )}
        </div>
        <br />
        <RaisedButton
          className="signUpSubmit"
          inherit={true}
          type="submit"
          label="submit"
        />
      </form>
      <p style={{ color: "grey" }}>
        Aleady have an account? <br />
        <Tab label="Login" component={Link} to="/" />
      </p>
    </div>
  );
};

export default SignUpForm;
