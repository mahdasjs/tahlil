import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import TextField from "material-ui/TextField";
import { If } from "rc-if-else";
import RaisedButton from "material-ui/RaisedButton";
import { Avatar } from "material-ui";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Cookie from "js-cookie";
import headerimage from './bokeh.jpg'
const FormData = require('form-data');

const theme = createMuiTheme({
  palette: {
    secondary: {
      dark: "#ad8291",
      main: "#f9c8d9",
      light: "#f8bbd0",
    },
    primary: {
      dark: "#7ca4a9",
      main: "#c1eff4",
      light: "#c1eff4",
    },
  },
});

class createPlaylist extends Component {
  
  state = {
    playlistName: "",
    playlistTag: '',
    image: headerimage,
    imagePreview: headerimage,
    public: true,
    Id: "",
    bool:true,
  };

  fileSelectedHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      imagePreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  handlechangeName = (e) => {
    this.setState({ playlistName: e.target.value });
  };

  handlechangeTag = (e) => {
    this.setState({ playlistTag: e.target.value.split(',') });
  };

  handleChangePrivacy = (e) => {
    this.setState({ public: !this.state.public });
  };
  handleClick = (event) => {
    if(!this.state.playlistTag){
      this.setState({bool:true})
    }
    else
    {const formData = new FormData();
    formData.append("title",this.state.playlistName);
    formData.append('private',this.state.public)
    for(var i = 0; i<this.state.playlistTag.length; i++)
      formData.append(`hashtags[${i}]name`,this.state.playlistTag[i])
    if(this.state.image!==null)
     { formData.append('image',this.state.image)}
      axios({
      method: "post",
      url: `http://localhost:8000/api/v1/playlist/`,
      headers: { 
        "Content-type": "multipart/form-data",
        'Authorization':`Token ${Cookie.get('token')}`},
        data:formData
    }).then((response) => {
      this.setState({ Id: response.data.id });
        this.props.history.push("/playlistPage/"+response.data.id+"/"+Cookie.get('userid'))
    });}
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <div className="logBox0">
            
            <h1 style={{fontFamily:'Open Sans', fontSize: 30 }}>create your playlist</h1>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.fileSelectedHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <If condition={this.state.imagePreview !== null}>
              <Avatar
                src={this.state.imagePreview}
                style={{
                  width: 120,
                  height: 120,
                }}
              />
            </If>
            <If condition={this.state.imagePreview === null}></If>
            <br />
            <p style={{fontFamily:'Open Sans'}}>choose your playlist cover image</p>
            <RaisedButton
              style={{ color: "#fff", backgroundColor: "#303f9f",fontFamily:'Open Sans' }}
              onClick={() => this.fileInput.click()}
            >
              upload
            </RaisedButton>
            <br />
            <TextField
              className="createplaylistbox"
              floatingLabelText="Name"
              onChange={(event, newValue) =>
                this.setState({ playlistName: newValue })
              }
              style={{ fontSize: 15,fontFamily:'Open Sans' }}
              margin="dense"
            />
            <br />
            <TextField
              type="playlistTag"
              className="createplaylistbox"
              floatingLabelText="Tag"
              onChange={this.handlechangeTag}
              style={{ fontSize: 15, fontFamily:'Open Sans'}}
              margin="dense"
            />
            <br />
            <span style={{ fontSize: 11,fontFamily:'Open Sans' }}>
              (discribe your playlist in separated words separating with ,)
            </span>
            <br />
            {!this.state.bool?
              <p>
                  <small style={{ color: "red" ,fontFamily:'Open Sans'}}>
                    Please enter hashtags
                  </small>
                  <br />
                </p>
            :null
            }
            <If
              condition={
                typeof this.state.playlistName !== "string" ||
                this.state.playlistName.trim().length === 0
              }
            >
              <RaisedButton
                className="creatPlaylist"
                label="create"
                style={style}
                disabled={true}
              ></RaisedButton>
            </If>

            <If
              condition={
                typeof this.state.playlistName === "string" &&
                this.state.playlistName.trim().length !== 0
              }
            >
              <RaisedButton
                className="creatPlaylist"
                label="create"
                style={style}
                onClick={this.handleClick}
              />

            </If>

          </div>
        </div>
      </ThemeProvider>
    );
  }
}
const style = {
  margin: 15,
};

export default createPlaylist;
