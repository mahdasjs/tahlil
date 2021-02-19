import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Avatar, RaisedButton } from 'material-ui';
import TextField from "material-ui/TextField";
import { If } from 'rc-if-else';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Cookie from 'js-cookie'
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput"
class EditPlaylist extends Component {
  constructor(probs) {
    super(probs);
    this.state = {
      playlistName: null,
      playlistTag: [],
      image: null,
      imagePreview: null,
      Id: window.location.pathname.split('/')[2]
    };
  }
  handleClick = () => {
    this.props.togglePopUpEdit();
    this.props.onSuccessFullySave();
  };
  fileSelectedHandler = event => {
    this.setState({ image: event.target.files[0], imagePreview: URL.createObjectURL(event.target.files[0]) })
  }
  handlechangeName = e => {
    this.setState({ playlistName: e.target.value });
  }
  handlechangeTag = e => {
    this.setState({ playlistTag: e.target.value.split(',') });
  }
  getData=(e)=> {
    axios({
      method: 'get',
      url:  `http://localhost:8000/api/v1/playlist/${this.state.Id}/${Cookie.get('userid')}`,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization':  `Token ${Cookie.get('token')} `
      },
    })
      .then((res) => {
        const Tags = res.data.hashtags;
        const updatedtags = Tags.map(tag => {
          return tag.name
        });
        console.log(updatedtags)
        this.setState({ playlistTag: updatedtags })
        console.log(this.state.playlistTag)

        this.setState({
          playlistName: res.data.title,
        })
        if (res.image !== null) {
          this.setState({ image: res.data.image, imagePreview: res.data.image })
        }

      }
      )
  }
  componentDidMount() {
    this.getData();
  }
  handleEdit=(event)=> {
    const formData = new FormData();
    formData.append("title",this.state.playlistName);
    for(var i = 0; i<this.state.playlistTag.length; i++)
      formData.append( `hashtags[${i}]name `,this.state.playlistTag[i])
    formData.append('image',this.state.image)
      axios({
      method: "put",
      url:  `http://localhost:8000/api/v1/playlist/${this.state.Id}/${Cookie.get('userid')}`,
      headers: { 
        "Content-type": "multipart/form-data",
        'Authorization': `Token ${Cookie.get('token')}`},
        data:formData
    }).then((response) => {
      this.props.onSuccessFullySave();
      this.props.togglePopUpEdit();

    });
  }

  render() {
    return (
           
             <Grid container 
             style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' ,maxWidth:350}} >
             <Grid item xs={12} sm={12} md={12} lg={12}>
             <input
           style={{ display: "none" }}
           type="file"
           onChange={this.fileSelectedHandler}
           ref={(fileInput) => (this.fileInput = fileInput)}
         />
           <img
             // variant="square"
             src={this.state.imagePreview} 
             style={{
               width: 100,
               height: 100,
             }}/>
         </Grid>
         <Grid item xs={12} sm={12} md={12} lg={12}>
 
           <Button
             variant="outlined"
             size="small"
             style={{
               fontSize: 12,
               backgroundColor: "white",
               color: "grey",
             }}
             onClick={(event) => this.fileInput.click()}
           >
             {/* <CameraAltIcon size="small" /> */}
             upload
           </Button>
           </Grid>
         <br />
 
         <Grid item xs={12} sm={12} md={12} lg={12} style={{marginTop:20}}>
           <FormControl variant="outlined">
             <InputLabel shrink htmlFor="component-outlined" style={{marginTop:-7,marginLeft:-2}}>
              Name
             </InputLabel>
             <OutlinedInput
               style={{ fontSize: 13 }}
               className="namm"
               type="text"
               id="component-outlined"
               label="playlistname"
               name="playlistname"
               variant="text" 
               onChange={this.handlechangeName} 
               label="Name"
               value={this.state.playlistName}            />
           </FormControl>
           <br/>
           </Grid>
           <Grid item xs={12} sm={12} md={12} lg={12}
           style={{marginTop:20}}
           >
 
           <FormControl  variant="outlined">
             <InputLabel shrink htmlFor="component-outlined" style={{marginTop:-7,marginLeft:-5}}>
             Tags
             </InputLabel>
             <OutlinedInput
              className="namm"
              style={{fontSize: 13 }}
               type="text"
               id="component-outlined"
               name="Tags"
               onChange={this.handlechangeTag} 
                       label="Tags" 
                      value={this.state.playlistTag}
             />
           </FormControl>
           </Grid>
           <Grid item xs={12} sm={12} md={12} lg={12}>
 
           <p style={{fontSize:13}}>
                       (split your tags by ,)
                     </p>
 
 
         <br />
         </Grid>
         <Grid item xs={12} sm={12} md={12} lg={12}
         style={{justifyContent: 'right', alignItems: 'right', textAlign: 'right'}}>
 
         <Button
           style={{ color: "#303f9f"}}
           onClick={this.handleEdit}
         >
           Done
         </Button>
         </Grid>
         </Grid>
    )
  }
}
export default EditPlaylist;
