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
import TopPlaylists from './songoptions';
import FreeScrollbar from 'react-free-scrollbar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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


class Postpopup extends Component {
  state = {
    selected: window.location.pathname.split('/')[2]||41,

    playlistName: "",
    Caption: '',
    image: null,
    imagePreview: null,
    public: true,
    PlaylistId:  window.location.pathname.split('/')[2]||41,
    bool:true,
    errors:null,
    songsId:[],
    topPlaylists:[],
    checked:true,
    checkbox:true,
    songtitle:null,
    open: false,

  };
  componentDidMount(){
    axios({
      method: 'get',
      url: `http://localhost:8000/api/v1/playlist/${this.state.PlaylistId}/${Cookie.get('userid')}`,
      headers: { 'Authorization': `Token ${Cookie.get('token')}` },
  })
      .then(response => {
          const topMusic = response.data.songs||[];
          const updatedtags = topMusic.map(tag => {
              return tag.track_name
          });
          this.setState({ songsId: updatedtags })

          const updatedtopMusic = topMusic.map(post => {
              return {
                  ...post,
              }
          });
          this.setState({ topPlaylists: updatedtopMusic });
      })


  }
  childHandler=()=> {
    // log our state before and after we updated it
    this.setState({
        checkbox:!this.state.checkbox
    });
  }
  fileSelectedHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      imagePreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  handlechangeCaption = (e) => {
    this.setState({ Caption: e.target.value });
    console.log(this.state.Caption)
  };

  handleExit = (event) =>{
    this.props.togglePopUpPost();
  }
  handleClickSnack = () => {
    this.setState({ open: true });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    this.setState({ open: false });
  };
  handleClick = (event) => {
    this.handleClickSnack()

    const formData = new FormData();
    formData.append("playlist",this.state.PlaylistId);
    formData.append("caption",this.state.Caption)
    for(var i = 0; i<this.state.songsId.length; i++)
      formData.append(`song[${i}]track_name`,this.state.songsId[i])
      axios({
      method: "post",
      url: "http://localhost:8000/api/v1/posts/profile/create/",
      headers: { 
        "Content-type": "multipart/form-data",
        'Authorization':`Token ${Cookie.get('token')}`},
        data:formData
    }).then((response) => {

      // this.props.togglePopUpPost();
      // this.props.history.push('/homepage')
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data)
          this.setState({
            errors:error.response.data
           });
        }
        else{
        }
      });
  }
  SelectedHandler(track_name){
    for(var i = 0; i<this.state.songsId.length; i++){
      if(this.state.songsId[i]===track_name){
        const update= this.state.songsId.slice(0, i).concat(this.state.songsId.slice(i + 1, this.state.songsId.length))
        this.setState({songsId:update})
        break;
      }
      console.log(this.state.songsId)
    }
      console.log(this.state.checkbox)

}



  render() {
    const { classes } = this.props;

    let topPlaylists = this.state.topPlaylists.map(post => {
      return <TopPlaylists
          action={this.childHandler}
          key={post.id}
          title={post.track_name}
          image={post.image}
          url={post.track_url}
          artist={post.artist_name}
          ids={post.platform}
          id={post.id}
          clicked={() => this.SelectedHandler(post.track_name)} />;
          
  });
    return (
      <Grid container spacing={2}>
              <Grid item container xs={12} sm={12} md={12} lg={12} >
                <Grid item xs={12} sm={4} md={4} lg={12} 
                  style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundColor:'#000' }} >
                  <div
                  //  style={{justifyContent: 'center', alignItems: 'center', minHeight:220}}
                   >
                    <input 
                      style={{ display: 'none' }} 
                      type="file" 
                      onChange={this.fileSelectedHandler}
                      ref={fileInput => this.fileInput = fileInput} />
                    <img 
                      src={this.props.image} 
                      style={{
                        maxWidth:'100%',
                        height:'auto',
                        maxHeight:220
                    }} />

                  </div>
                </Grid>
                <Grid item container xs={12} sm={8} md={8} lg={12} style={{marginTop:20}} >
                  <div className="navbar">
                    <TextareaAutosize onChange={this.handlechangeCaption} rowsMin={3} aria-label="caption" placeholder="caption" style={{width:'323%'}} />
                  </div>
                  <div className="bottombar">
                    <TextareaAutosize onChange={this.handlechangeCaption} rowsMin={3} aria-label="caption" placeholder="caption" style={{width:'100%'}} />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <p style={{fontSize:14,fontFamily:'Open Sans'}}>select musics that you want to post :</p>
                                        {topPlaylists}


                </Grid>
              </Grid>
              <Grid item container xs={12} sm={12} md={12} lg={12}>
                <Grid item xs={4} sm={4} md={4} lg={12} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={12} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  {/* <If condition={typeof this.state.Caption !== "string" ||
                    this.state.Caption.trim().length === 0}> */}
                      <Grid item xs={12} sm={12} md={12} lg={12}
        style={{justifyContent: 'right', alignItems: 'right', textAlign: 'right'}}>

                     <Button
          style={{ color: "#303f9f"}}

          onClick={this.handleClick}
        >
          Post
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
            message="post created!"
          />
        </Snackbar>
        
                  {/* </If> */}
                  {/* <If condition={typeof this.state.Caption === "string" &&
                    this.state.Caption.trim().length !== 0}
                  >
                    <RaisedButton style={{ cursor: 'pointer', justifyContent: 'center' }} label="Done" secondary={true} onClick={this.handleClick}
                    //  containerElement={Link} to={"/playlistpage"}
                     >
                    </RaisedButton>
                  </If> */}
                </Grid>
              </Grid>
              </Grid>
    )
  }
}
Postpopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(Postpopup);