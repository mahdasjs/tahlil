import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Plus from "@material-ui/icons/Add";
import Play from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import IconButton from '@material-ui/core/IconButton';
import './app.css';
import Delete from '@material-ui/icons/DeleteSharp';
import Cookie from 'js-cookie';
import axios from 'axios';
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
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {If} from 'rc-if-else';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddPlaylist from './addmusic'

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

const theme = createMuiTheme({
    typography: {
      body1: {
        fontFamily:( "Open Sans"),
        fontWeight: 500,
      },
    },
  });
  class post extends React.Component {  
    constructor(props){
      super(props);
      this.state={
        logo:null,
        open: false,
        openAdd:false,
        play:false

      }
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
    delmusic= () => {
      this.props.action()
      if(this.props.ids==='Soundcloud')
     { axios({
          method:'delete',
          url: `http://localhost:8000/api/v1/songs/soundcloud/${this.props.id}`,
          headers: { 'Authorization':`Token ${Cookie.get('token')}`},
        
      })
      this.props.Reaload()
    }
      else{
        axios({
          method:'delete',
          url: `http://localhost:8000/api/v1/songs/spotify/${this.props.id}`,
          headers: { 'Authorization':`Token ${Cookie.get('token')}`}
      })
      this.props.Reaload()
    }

      this.props.Reaload()
  }
  handleClickOpenAdd = () => {
    this.setState({ openAdd: true });
  };
  handleClick=()=>{
    this.setState({play:!this.state.play})
  }
  handleCloseAdd = () => {
    this.setState({ openAdd: false });
  };
    render(){
      const { classes } = this.props;

      return(
       <ThemeProvider theme={theme}>
    <Card  
    // onClick={this.props.Reaload}
     style={{marginTop:4, display: 'flex',flexWrap:'nowrap' ,maxHeight:40,minHeight:40 }}>  
          <Grid container>
     <Grid  item xs={8} sm={10} md={10} lg={10}>
      <CardContent style={{display:'flex',flexWrap:'nowrap', alignContent: 'left', alignItems: 'left'}}>
        <CardMedia
            image={this.props.image}
            style={{ maxHeight: 50, maxWidth: 50, minWidth: 50, minHeight: 50,marginTop:-18,marginLeft:-15}}/>   
                      <div className="navbar">
            <If condition={this.props.title.length<51}>

          <Typography variant='body1' align='left' style={{marginLeft:10,marginTop:-5,fontSize:13,fontFamily:'Open Sans'}} >
             {this.props.title} 
          </Typography>
          </If>
          <If condition={this.props.title.length>50}>
          <div>
          <Tooltip title=  {this.props.title} >
          <Typography variant='body1' align='left' style={{marginLeft:10,marginTop:-5,fontSize:13,fontFamily:'Open Sans'}} >
          {this.props.title.substring(0,47)}... 
          </Typography>
          </Tooltip>
          </div>

          </If>
          </div>

          <div  className="bottombar">
          <Typography variant='body1' align='left' style={{display:'flex',flexWrap:'nowrap', marginLeft:10,marginTop:-5,fontSize:10,fontFamily:'Open Sans'}} >
             {this.props.title.substring(0,17)} ...

          </Typography>
          </div>
      </CardContent>
      </Grid> 
      <Grid  item xs={2} sm={1} md={1} lg={1} >
        {
          !this.state.play?
          <div onClick={this.handleClick}>
          <Tooltip  title="Play">
                                                            <IconButton
                                                                variant="contained"
                                                                style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                                                                onClick={this.props.onclick}  
                                                            >
                                                                <Play/>
                                                            </IconButton>
                    </Tooltip>
                    </div>
          : <div onClick={this.handleClick}>
          <Tooltip  title="Pause">
                                                            <IconButton
                                                                variant="contained"
                                                                style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                                                                onClick={this.props.onclick}  
                                                            >
                                                                <Pause/>
                                                            </IconButton>
                    </Tooltip>
                    </div>
        }
       
               
      </Grid>
      <Grid  item xs={2} sm={1} md={1} lg={1}>
     {window.location.pathname.split('/')[3]!==Cookie.get('userid')?
      <Tooltip  title="Add">
                                                        <IconButton
                                                            variant="contained"
                                                            style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                                                            onClick={this.handleClickOpenAdd}  



                                                            // containerElement={Link} to={this.handleClone}
                                                        >
                                                            <Plus
                                                                                                                        

                                                             />
                                                        </IconButton>
                </Tooltip>
                :<Tooltip  title="Delete">
                <IconButton
                    variant="contained"
                    style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                    onClick={this.delmusic}



                    // containerElement={Link} to={this.handleClone}
                >
                    <Delete
                                                                                
                                  style={{fontSize:19}}

                     />
                </IconButton>
</Tooltip>
                }
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
            variant="error"
            message="music is deleted!"
          />
        </Snackbar>
      </Grid>
      <Dialog
          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openAdd}
                onClose={this.handleCloseAdd}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">           
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
            adding  "{this.props.title}" to:</Typography>
                </DialogTitle>
                <DialogContent style={{marginBottom:20}}>
                <AddPlaylist
                Name={this.props.title}
                Url={this.props.url}
                SpotifyOrSoundcloud={this.props.ids}
                Image={this.props.image}
                artist={this.state.selecteartist}
                togglePopUpDelete={this.handleClickOpenAdd}
                onSuccessFullySave={() => {
                  this.handleCloseAdd()}}
              />
                
                </DialogContent>
              </Dialog>
    </Card>
  </ThemeProvider>
);
      }
    }
    post.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    
    export default withStyles(styles2)(post);