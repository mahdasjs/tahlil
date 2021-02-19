import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import TopPlaylists from './Topplaylist';
import TopMusic from './Topmusic';
import FreeScrollBar from 'react-free-scrollbar';
import HorizontalScroll from 'react-scroll-horizontal'
import AddPlaylist from './addmusic'
import Createplaylistpopup from './createplaylistpopup'
import Plus from "@material-ui/icons/Add";
import Grid from '@material-ui/core/Grid';
import './homepage.css'
import Cookie from 'js-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Fab, Tooltip } from '@material-ui/core';
import Posts from './post';
import { If } from 'rc-if-else';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Story from './story.js';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

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

class homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topPlaylists: [],
      topMusic: [],
      selectedUrl: null,
      selectedUrlX:null,
      selectedname: null,
      error: false,
      createplaylistpopup: false,
      showPopUpDelete: false,
      SpotifyOrSoundcloud: false,
      SpotifyOrSoundcloudP: false,
      selectedImage: null,
      selecteartist: null,
      loading:true,
      posts:[],
      userid:Cookie.get("userid"),
      logedinUser:null,
      open: false,
      openAdd:false,
      story:[],
      openStory:false,
      SpotifyOrSoundcloudstory:false,
      selecteduser:null,
      profile_picture:null,
      openAddedmusic:false,
      storyid:null,
      userName:null,
      userPic:null
    };
    this.togglePopUp = this.togglePopUp.bind(this)
    this.childHandler = this.childHandler.bind(this)
    this.storyHandler = this.storyHandler.bind(this)
    this.togglePopUpAdd = this.togglePopUpAdd.bind(this)
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleSnack = () => {
    this.setState({ openAddedmusic:true  });
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    this.setState({ open: false,openAddedmusic:false });
  };

  handleClickOpenAdd = () => {
    this.setState({ openAdd: true });
  };

  handleCloseAdd = () => {
    this.setState({ openAdd: false });
  };
  handleClickOpenStory = () => {
    this.setState({ openStory: true });
  };

  handleCloseStory = () => {
    this.setState({ openStory: false });
  };
  togglePopUpAdd = () => {
    this.setState({ showPopUpDelete: !this.state.showPopUpDelete })
}

  togglePopUp = () => {
    this.setState({ createplaylistpopup: !this.state.createplaylistpopup })
  }
  childHandler = (URL,bool,name,image) => {
    this.setState({      
      selectedUrl: URL,
      SpotifyOrSoundcloudP:bool,
      selectedname:name,
      selectedImage:image  ,   
    })
    this.handleClickOpenAdd()
  }
  storyHandler = (URL,bool,name,image,username,profile_picture,id) => {
    {    if(URL.includes('tracks')){
      this.setState({SpotifyOrSoundcloudstory:true})
    }
    else{
      this.setState({SpotifyOrSoundcloudstory:false})
    }}    this.setState({      
      selectedUrl: URL,
      selectedname:name,
      selectedImage:image  ,   
      selecteduser:username,
      profile_picture:profile_picture,
      storyid:id
    })
    this.handleClickOpenStory()
  }
  playHandler = (URL,bool,name,image) => {
    this.setState({      
      selectedUrlX: URL,
      SpotifyOrSoundcloud:bool,
      selectedname:name,
      selectedImage:image  ,   
    })
  }
  componentDidMount() {
    axios
    .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${this.state.userid}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Token ${Cookie.get('token')}`
            },
    })
    .then((res) => {
      console.log(res.data);
      this.setState({
        logedinUser: res.data.username,
      });
    })
    axios({
      method: 'get',
      url: `http://localhost:8000/api/v1/posts/homepage/`,
      headers: { 'Authorization': `Token ${Cookie.get('token')}` },
  })
      .then(response => {
          const post = response.data||[];
          console.log(response.data)
          const updatedpost = post.map(post => {
              return {
                  ...post,
              }
            })
          this.setState({ posts: updatedpost });
          console.log(this.state.posts)

      })
      axios({
        method: 'get',
        url: `      http://localhost:8000/api/v1/accounts/users/userprofile/${window.location.pathname.split('/')[2]}        `,
        headers: { 'Authorization': `Token ${Cookie.get('token')}` },
    })
        .then(response => {
            this.setState({userName:response.data.username,userPic:response.data.user_profile.profile_picture});
  
        })
      axios({
        method: 'get',
        url: `http://localhost:8000/api/v1/stories/homepage/list/`,
        headers: { 'Authorization': `Token ${Cookie.get('token')}` },
    })
        .then(response => {
            const post = response.data||[];
            console.log(response.data)
            const updatedpost = post.map(post => {
                return {
                    ...post,
                }
              })
            this.setState({ story: updatedpost });
            console.log(updatedpost)
  
        })
      const topPlaylists = axios({
      method: 'get',
      url: 'http://localhost:8000/api/v1/playlist/top/tracks/',
      headers: { 'Authorization': `Token ${Cookie.get('token')}` },
    });
    const topMusic = axios({
      method: 'get',
      url: 'http://localhost:8000/api/v1/playlist/featured/playlist/',
      headers: { 'Authorization': `Token ${Cookie.get('token')}` },
    });
    axios.all([topPlaylists, topMusic])
      .then(
        axios.spread((...responses) => {
          const topPlaylists = responses[0].data;
          const updatedtopPlaylists = topPlaylists.map(post => {
            return {
              ...post,
            }
          });
          const shufflee = updatedtopPlaylists
            .sort(() => Math.random() - 0.5);
          this.setState({ topPlaylists: shufflee });
          const topMusic = responses[1].data;
          const updatedtopMusic = topMusic.map(post => {
            return {
              ...post,
            }
          });
          const shuffle = updatedtopMusic
            .sort(() => Math.random() - 0.5);
          this.setState({ topMusic: shuffle});
          this.setState({loading:false})
        }))
      .catch(error => {
        this.setState({ error: true });
      });
  }

  SelectedMusic = (URL, bool, name) => {
    this.setState({selectedUrlX:URL, selectedUrl: URL, SpotifyOrSoundcloud: bool, selectedname: name });
  }
  SelectedHandler = (URL, bool, name, image, artist) => {
    Cookie.set('url',URL);
    this.setState({selectedUrlX:URL, selectedUrl: URL, SpotifyOrSoundcloud: bool, selectedname: name, selectedImage: image, selecteartist: artist });
  }

  render() {
    let topPlaylists = this.state.topPlaylists.map(post => {
      return <TopPlaylists
      // action={this.handleClickOpenAdd}
      key={post.url}
        title={post.name}
        image={post.image}
        url={post.url}
        artist={post.artist}
        ids={post.ids}
        selecting={() => this.childHandler(post.url, post.ids, post.name, post.image, post.artist)}
        clicked={() => this.SelectedHandler(post.url, post.ids, post.name, post.image, post.artist)} 
        />;
    });
     let rspMusic = this.state.topPlaylists.map((post, index) => {
        return <TopMusic
        key={post.url}
        title={post.name}
        image={post.image}
        url={post.url}
        artist={post.artist}
        ids={post.ids}
        rsp={true}
        selecting={() => this.childHandler(post.url, post.ids, post.name, post.image, post.artist)}

          clicked={() => this.SelectedHandler(post.url, post.ids)} />;
      });
    let posts = this.state.posts.map(post => {
      return <Posts
      logedinUser={this.state.logedinUser}
       selecting={this.childHandler}
       play={this.playHandler}
        key={post.id}
        title={post.caption}
        id={post.id}
        date={post.date.split('T')[0]}
        image={post.playlist.image}
        username={post.user.username}
        profile_picture={post.user.profile_picture}
        postId={post.id}
        postUser={post.user.id}
        Snack={this.handleSnack}
        />;
    });
    let topMusic = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      topMusic = this.state.topMusic.map((post, index) => {
        return <TopMusic
          key={index + 10}
          title={post.name}
          image={post.image}
          url={post.url}
          ids={post.ids}
          clicked={() => this.SelectedHandler(post.url, post.ids)} />;
      });
    }
    let story = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    if (!this.state.error) {
      story = this.state.story.map(post => {
        return <Story
          logedinUser={this.state.logedinUser}
          url={post.song.track_url}
          profile_picture={post.user.profile_picture}
          storyid={post.id}
          selecting={() => this.storyHandler(post.song[0].track_url, post.ids, post.name, post.image, post.user.username,post.user.profile_picture,post.id)} />
   });
    }
    const { fullScreen } = this.props;
    return (
      <div  style={{backgroundColor:'#f81717 '}}>
        <div className="homepage">
        {this.state.loading?
                    <div style={{
                      fontFamily:'Open Sans',
                      display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height:'80%'}}>
                        <CircularProgress disableShrink />
                         Loading ...
                    </div>
                 
                :null
                }   
                                                    {this.state.loading===false?

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} lg={9}>
              <div className="tplaylists" style={{ height: '220px' }}>
                <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Top Playlists </h2>
                <hr />
                {this.state.loading?
                 <CircularProgress disableShrink style={{display:'table',marginLeft:'auto' ,marginRight:'auto'}}/>
                :null
                }
                <HorizontalScroll  >
                  {topMusic}
                </HorizontalScroll>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} lg={3} >
              <div className="Topspotifymusicscroll" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:35,paddingLeft:10 , width: '23%', height: '100%'}}>
                <h2 style={{fontFamily:'Open Sans', fontSize: 25,marginTop:25, lineHeight: 0.01 }}>Top Musics </h2 >
                <hr style={{width:'100%'}} />
                <div style={{position:'fixed',marginTop:0,marginLeft:0, width: '23%', height: '76%'}}>
                {this.state.loading?
                 <CircularProgress style={{ display:'table',marginLeft:'auto' ,marginRight:'auto'}} disableShrink />
                :null
                }
                <FreeScrollBar  >
                  {topPlaylists}
                </FreeScrollBar>
                </div>
              </div>

            </Grid>
            <Grid item xs={12} sm={12} lg={9}>
              <div className="bottombar" style={{ height: '250px',width:'95%' }}>
                <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Top Musics </h2>
                <hr />
                {this.state.loading?
                 <CircularProgress disableShrink style={{display:'table',marginLeft:'auto' ,marginRight:'auto'}}/>
                :null
                }
                <HorizontalScroll  >
                  {rspMusic}
                </HorizontalScroll>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} lg={9}>
              {this.state.story.length!==0?
            <If condition={ window.location.pathname.split('/').length!==4}>
              <div className="tplaylists" style={{ height: '100px' }}>
                <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Stories </h2>
                <hr />
                {this.state.loading?
                 <CircularProgress disableShrink style={{display:'table',marginLeft:'auto' ,marginRight:'auto'}}/>
                :null
                }
                <If condition={this.state.story.length<10}>
              <div style={{display:'flex',flexWrap:'nowrap'}} >
                  {story}
                </div>
                </If>
              </div>
              </If>
              :null
            }
            </Grid>
            <If condition={ window.location.pathname.split('/').length===2}>
            {posts.length!==0?

            <Grid item xs={12} sm={12} md={12} lg={7} >

            <h2 style={{fontFamily:'Open Sans', fontSize: 30, lineHeight: 0.1 }}>Posts </h2>
            <div className='navbar'>
            <hr style={{minWidth:'135%'}}/>
            </div>
            <div className='bottombar'>
            <hr style={{maxWidth:'90%'}}/>
            </div>
            {this.state.loading?
                 <CircularProgress disableShrink style={{ display:'table',marginLeft:'65%' ,marginRight:'auto'}}/>
:<div className="postScroll" style={{fontFamily:'Open Sans', marginBottom:100}}>
  {posts}

  </div>
  }

</Grid>
  :null
}
</If>
<If condition={ window.location.pathname.split('/').length===4}>

<Grid item xs={12} sm={12} md={12} lg={7} >
<div className="postScroll" style={{ marginBottom:100}}>
<Posts 
        logedinUser={this.state.logedinUser}
        selecting={this.childHandler}
        play={this.playHandler}
         key={window.location.pathname.split('/')[2]}
         id={window.location.pathname.split('/')[3]}
         username={this.state.userName}
         profile_picture={this.state.userPic}
         postId={window.location.pathname.split('/')[3]}
         postUser={window.location.pathname.split('/')[2]}/>

</div>
</Grid>
</If>
          </Grid>
                          :null
                        }   
          <Grid item xs={12} sm={12} lg={12}>
          <Dialog
          style={{zIndex:100000000}}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">Create your playlist</DialogTitle>
                <DialogContent >
                  <Createplaylistpopup
                    onSuccessFullySave={() => {
                      this.handleClose();
                    }}
                  />
                </DialogContent>
              </Dialog>
              {this.state.loading===false?

            <div className="createplaylist">
              <Tooltip  title="create playlist">
          <Fab 
          style={{ maxWidth:40,minWidth:40,maxHeight:40,minHeight:40, backgroundColor:"#D81B60"}}
                  onClick={this.handleClickOpen}>
                    <Plus style={{color:"#fff", fontSize:25}}/>
                </Fab>
                </Tooltip>
                </div>
                                          :null
                                        }
                </Grid>
          <Grid item xs={12} sm={12} lg={12} style={{marginLeft:-245}}>
            <header  >
              {this.state.selectedUrlX ?
                <div className="player">
                  {this.state.SpotifyOrSoundcloud === true ?
      <iframe width="90%" height="300" scrolling="no" frameborder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'+ this.state.selectedUrlX +'&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>     
      : <iframe  src={'https://open.spotify.com/embed/' + this.state.selectedUrlX}
      width="90%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media" />
                  }
                </div>
                : null
              }
            </header>
          </Grid> 
           <Grid item xs={12} sm={12} lg={12}>
            <header  >
              {this.state.selectedUrlX ?
                <div className="player1">
                  {this.state.SpotifyOrSoundcloud === true ?
                    <iframe  title={this.state.selectedUrlX} frameBorder="no" width="100%" height="80" scrolling="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/" + this.state.selectedUrlX + "&color=%23848484&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"}></iframe>
                    : <iframe title={this.state.selectedUrlX} frameBorder="no" src={'https://open.spotify.com/embed/' + this.state.selectedUrlX }
                      width="100%" height="80"  allowtransparency="true" allow="encrypted-media" />
                  }
                </div>
                : null
              }
            </header>
          </Grid>
          <Grid item xs={12} sm={12} lg={12} >
          <Dialog
                style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openAdd}
                onClose={this.handleCloseAdd}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title">           
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
                adding  "{this.state.selectedname}" to:</Typography>
                </DialogTitle>
                <DialogContent style={{marginBottom:20}} onClick={this.handleSnack}>
                <AddPlaylist
                Name={this.state.selectedname}
                Url={this.state.selectedUrl}
                SpotifyOrSoundcloud={this.state.SpotifyOrSoundcloudP}
                Image={this.state.selectedImage}
                artist={this.state.selecteartist}
                togglePopUpDelete={this.handleClickOpenAdd}
                onSuccessFullySave={() => {
                  this.handleCloseAdd()}}
              />
                
                </DialogContent>
              </Dialog>
              <Dialog
                style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openStory}
                onClose={this.handleCloseStory}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                  <div style={{backgroundColor:'#f0f0f027'}}>
                <DialogTitle id="scroll-dialog-title">
        
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left',display:'flex',flexWrap:'nowrap'}}>
                <Avatar
  src={this.state.profile_picture}
  style={{
    width: 40,
    height: 40,
    marginRight:5
  }}
/>   
                {this.state.selecteduser}</Typography>
                </DialogTitle>
                
                <DialogContent >
                {this.state.SpotifyOrSoundcloudstory === true ?
      <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'+ this.state.selectedUrl +'&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>     
      : <iframe  src={'https://open.spotify.com/embed/' + this.state.selectedUrl}
      width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media" />
                  }
                
                </DialogContent>
                </div>
              </Dialog>
              <Snackbar 
                                                            style={{zIndex:100000}}

        anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}           open={this.state.openAddedmusic}
                                                    autoHideDuration={4000}
                                                    onClose={this.handleClose}  >
                                                         <MySnackbarContentWrapper
                                                                                                             style={{zIndex:100000}}

            onClose={this.handleClose}
            variant="success"
            message="music is added!"
          />
        </Snackbar>
          </Grid>
          
        </div>
      </div>
    )
  }
  
}  

homepage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(homepage);
