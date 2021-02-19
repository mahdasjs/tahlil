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
import FreeScrollBar from 'react-perfect-scrollbar';
import Typography from '@material-ui/core/Typography';
import TopPlaylists from './chioceplaylist'

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
    topMusic: [],
    selectedId:null,
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

  componentDidMount(){
    axios({
        method: 'get',
        url: `http://localhost:8000/api/v1/playlist/${Cookie.get('userid')}`,
        headers: { 'Authorization':`Token ${Cookie.get('token')}`},
    })
    .then(response => {
        const topMusic = response.data;
        const updatedtopMusic = topMusic.map(post => {
            return {
                ...post,
            }
        });
        this.setState({ topMusic: updatedtopMusic });
    })
    .catch(error => {
        this.setState({ error: true });
    });
}
SelectedHandler = (ID) => {
  this.props.onSuccessFullySave();
    this.setState({selectedId: ID});
    var data = {
        track_url: this.props.Url,
        track_name: this.props.Name,
        image:this.props.Image,
        artist_name:"unknown",
        playlists:ID
      };
      console.log(data)
    if(this.props.SpotifyOrSoundcloud)

    {  
    axios({
      method: "post",
      url: "http://localhost:8000/api/v1/songs/soundcloud/",
      headers: { 
        'Authorization':`Token ${Cookie.get('token')}`},
        data
    }).then((response) => {
      console.log(response);
      this.setState({ Id: response.data.id });
    }); }
    else
    {  axios({
      method: "post",
      url: "http://localhost:8000/api/v1/songs/spotify/",
      headers: { 
        'Authorization':`Token ${Cookie.get('token')}`},
        data
    }).then((response) => {
      console.log(response);
      this.setState({ Id: response.data.id });
    }); }
  }

  render() {
    const { classes } = this.props;
    let topPlaylists = this.state.topMusic.map(post => {
      return <TopPlaylists 
      key={post.id}
      title={post.title} 
      image={post.image}
      Id={post.id}
      songs={post.songs.length}

      clicked={() => this.SelectedHandler(post.id)} />;
  });
    return (
            <Grid container 
            style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' ,maxWidth:350}} >
            <Grid item xs={12} sm={12} md={12} lg={12} >
            
                <Grid container spacing={2} justify="center">
                           {topPlaylists}
                </Grid>
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
