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
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput"
import headerImage from './bokeh.jpg'
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}
MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class EditPlaylist extends Component {
  state = {
    playlistName: "",
    playlistTag: '',
    image: null,
    imagePreview: null,
    public: true,
    Id: "",
    bool:true,
    errors:null,
    open: false,

  };
  handleClickSnack = () => {
    this.setState({ open: true });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    this.setState({ open: false });
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
  handleExit = (event) =>{
    this.props.togglePopUpEdit();
  }
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
      this.props.togglePopUpEdit();

        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data)
          this.setState({
            errors:error.response.data
           });
        }
        else{
          this.handleClickSnack()
        }
      });
    }
  }


  render() {
    const { classes } = this.props;

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
            src={this.state.imagePreview||headerImage} 
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
                      defaultValue={this.state.playlistTag}
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

          onClick={this.handleClick}
        >
          Create
        </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message={this.state.playlistName + " "+" was been created!"}
          />
        </Snackbar>
        </Grid>
    )
  }
}
EditPlaylist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(EditPlaylist);