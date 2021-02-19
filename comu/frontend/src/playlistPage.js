import React, { Component } from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Share from '@material-ui/icons/Share';
import Post from '@material-ui/icons/PostAdd';
import Tooltip from '@material-ui/core/Tooltip';
import headerImage from './bokeh.jpg';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import EditPlaylist from './editPlaylist';
import DeletePlaylist from './deletePlaylist';
import CloudIcon from '@material-ui/icons/Cloud';
import Snackbar from '@material-ui/core/Snackbar';
import HorizontalScroll from 'react-scroll-horizontal';
import TopMusic from './chioceplaylist';
import './style.css';
import './playlistPage.css';
import './homepage.css';
import { ThemeProvider } from '@material-ui/styles';
import Cookie from 'js-cookie';
import { If } from 'rc-if-else';
import TextField from '@material-ui/core/TextField';
import Postpopup from './postpopup'
import Playlistsong from './playlistsongs'
import './style.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types';
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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FreeScrollbar from 'react-free-scrollbar';
import { Twitter,Facebook,Pinterest		 } from 'react-social-sharing'
import Link from '@material-ui/icons/Link';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
    typography: {
        body1: {
            fontFamily:(     'Open Sans'),
            fontWeight: 500,
            fontStretch: ("ultra-expanded")
        }
    },
});

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





class playlistPage extends Component {

    constructor(probs) {
        super(probs);
        this.state = {
            selected: window.location.pathname.split('/')[2]||41,
            topMusic: [],
            topPlaylists: [],
            name: null,
            image: null,
            tags: [],
            songs: null,
            private: null,
            showPopUpEdit: false,
            showPopUpDelete: false,
            cloneSucceess: false,
            error: false,
            selectedplatform:null,
            selectedid:null,
            linkName:null,
            showPopUpPost:false,
            cloneSucceess: false,
            open: false,
            openLinkvalidation:false,
            openAdd:false,
            openEdit:false,
            openAddedmusic:false,
            opensuccess: false,
            openDel:false,
            openShare:false,
            loading:true

        }
        this.togglePopUpDelete = this.togglePopUpDelete.bind(this)
        this.togglePopUpEdit = this.togglePopUpEdit.bind(this)
    }
    handleClickOpenShare = () => {
        this.setState({ openShare: true });
      };
    
      handleCloseShare = () => {
        this.setState({ openShare: false });
      };
    handleClickOpenAdd = () => {
        this.setState({ openAdd: true });
      };
    
      handleCloseAdd = () => {
        this.setState({ openAdd: false });
      };
      handleClickOpensuccess = () => {
        this.setState({ opensuccess: true });
      };
    
      handleClosesuccess = () => {
        this.setState({ opensuccess: false });
      };
      handleClickOpenDel = () => {
        this.setState({ openDel: true });
        
      };
    
      handleCloseDel = () => {
        this.setState({ openDel: false });
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
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

      
      };
      handleClickOpenEdit = () => {
        this.setState({ openEdit: true });
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
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

        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${Cookie.get('token')}`
            },
        })
            .then((res) => {
                const Tags = res.data.hashtags;
                const updatedtags = Tags.map(tag => {
                    return {
                        ...tag,
                    }
                });
                this.setState({ tags: updatedtags })

                this.setState({
                    name: res.data.title,
                    private: res.data.private
                })
                if (res.image !== null) {
                    this.setState({ image: res.data.image })
                }

            }
            )
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data.songs||[];
                console.log(response.data.songs)
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topPlaylists: updatedtopMusic });
            })
      };
    
      handleCloseEdit = () => {
        this.setState({ openEdit: false });
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
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

        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${Cookie.get('token')}`
            },
        })
            .then((res) => {
                const Tags = res.data.hashtags;
                const updatedtags = Tags.map(tag => {
                    return {
                        ...tag,
                    }
                });
                this.setState({ tags: updatedtags })

                this.setState({
                    name: res.data.title,
                    private: res.data.private
                })
                if (res.image !== null) {
                    this.setState({ image: res.data.image })
                }

            }
            )
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data.songs||[];
                console.log(response.data.songs)
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topPlaylists: updatedtopMusic });
            })
      };
    handleClickSnack = () => {
        this.setState({ open: true });
      }; 
      handleValidSnack = () => {
        this.setState({ openLinkvalidation: true });
      };
      handleSnack = () => {
        this.setState({ openAddedmusic:true  });
      };
      handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        this.setState({ open: false,openLinkvalidation:false,openAddedmusic:false,opensuccess:false });
      };
    togglePopUpEdit = () => {
        this.setState({ showPopUpEdit: !this.state.showPopUpEdit })
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
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

        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${Cookie.get('token')}`
            },
        })
            .then((res) => {
                const Tags = res.data.hashtags;
                const updatedtags = Tags.map(tag => {
                    return {
                        ...tag,
                    }
                });
                this.setState({ tags: updatedtags })

                this.setState({
                    name: res.data.title,
                    private: res.data.private
                })
                if (res.image !== null) {
                    this.setState({ image: res.data.image })
                }

            }
            )
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data.songs||[];
                console.log(response.data.songs)
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topPlaylists: updatedtopMusic });
            })
    }
    togglePopUpPost = () => {
        this.setState({ showPopUpPost: !this.state.showPopUpPost })
    }
    togglePopUpDelete = () => {
        this.setState({ showPopUpDelete: !this.state.showPopUpDelete })
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
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

        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${Cookie.get('token')}`
            },
        })
            .then((res) => {
                const Tags = res.data.hashtags;
                const updatedtags = Tags.map(tag => {
                    return {
                        ...tag,
                    }
                });
                this.setState({ tags: updatedtags })

                this.setState({
                    name: res.data.title,
                    private: res.data.private
                })
                if (res.image !== null) {
                    this.setState({ image: res.data.image })
                }

            }
            )
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data.songs||[];
                console.log(response.data.songs)
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topPlaylists: updatedtopMusic });
            })
    }
    handleChange = (e) => {
        this.setState({ linkName: e.target.value });
      }
    handleLink=()=>{

        if(JSON.stringify( this.state.linkName).includes("https://soundcloud.com/"))
  
        {  
            const formData = new FormData();
            formData.append("track_link",this.state.linkName);
            formData.append("playlists",this.state.selected);
        axios({
          method: "post",
          url: "http://localhost:8000/api/v1/songs/soundcloud/link/",
          headers: { 
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`},
            data:formData
        }).then((response) => {
            axios({
                method: 'get',
                url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
                headers: { 'Authorization': `Token ${Cookie.get('token')}` },
            })
                .then(response => {
                    this.setState({linkName:' '})
                    const topMusic = response.data.songs||[];
                    console.log(response.data.songs)
                    const updatedtopMusic = topMusic.map(post => {
                        return {
                            ...post,
                        }
                    });
                    this.setState({ topPlaylists: updatedtopMusic });
                    this.handleSnack()

                })        }); }
        else if(JSON.stringify( this.state.linkName).includes("https://open.spotify.com/"))
        
        {  
            const formData = new FormData();
            formData.append("track_link",this.state.linkName);
            formData.append("playlists",this.state.selected);
            axios({
          method: "post",
          url: "http://localhost:8000/api/v1/songs/spotify/link/",
          headers: { 
            'Authorization':`Token ${Cookie.get('token')}`},
            data:formData
        }).then((response) => {
            axios({
                method: 'get',
                url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
                headers: { 'Authorization': `Token ${Cookie.get('token')}` },
            })
                .then(response => {
                    this.setState({linkName:' '})

                    const topMusic = response.data.songs||[];
                    console.log(response.data.songs)
                    const updatedtopMusic = topMusic.map(post => {
                        return {
                            ...post,
                        }
                    });
                    this.setState({ topPlaylists: updatedtopMusic });
                    this.handleSnack()

                })     

               }); 

            }
        else{
            this.handleValidSnack()
        }
    }
    getPlaylistInfo = () => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${Cookie.get('token')}`
            },
        })
            .then((res) => {
                const Tags = res.data.hashtags;
                const updatedtags = Tags.map(tag => {
                    return {
                        ...tag,
                    }
                });
                this.setState({ tags: updatedtags })

                this.setState({
                    name: res.data.title,
                    private: res.data.private
                })
                if (res.image !== null) {
                    this.setState({ image: res.data.image })
                }

            }
            )
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data.songs||[];
                console.log(response.data.songs)
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topPlaylists: updatedtopMusic });
                this.setState({loading:false})

            })

    }
   
    componentDidMount() {
        this.setState({cloneSucceess:false})
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
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

        this.getPlaylistInfo();
    }
    SelectedHandler = (id,platform) => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${id}/${window.location.pathname.split('/')[3]}`,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${Cookie.get('token')}`
            },
        })
            .then((res) => {
                const Tags = res.data.hashtags;
                const updatedtags = Tags.map(tag => {
                    return {
                        ...tag,
                    }
                });
                this.setState({ tags: updatedtags })

                this.setState({
                    name: res.data.title,
                    private: res.data.private
                })
                if (res.image !== null) {
                    this.setState({ image: res.data.image })
                }

            }
            )
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${id}/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data.songs||[];
                console.log(response.data.songs)
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topPlaylists: updatedtopMusic });
            })
        this.setState({ selected: id,selectedplatform:platform });
        window.history.pushState('page2', 'Title', "/playlistPage/" + id+"/"+window.location.pathname.split('/')[3]);
    }
    handleClone = (e) => {
        const formData = new FormData();
        formData.append("title", this.state.name);
        formData.append('private', this.state.public)
        for (var i = 0; i < this.state.tags.length; i++)
            formData.append(`hashtags[${i}]name`, this.state.tags[i])
        formData.append('image', this.state.image);
            formData.append('songs', this.state.songs)
        axios({
            method: "post",
            url: `http://localhost:8000/api/v1/playlist/clone/${this.state.selected}`,
            headers: {
                "Content-type": "multipart/form-data",
                'Authorization': `Token ${Cookie.get('token')}`
            },
            data: formData
        }).then((response) => {
            axios({
                method: 'get',
                url: `http://localhost:8000/api/v1/playlist/${window.location.pathname.split('/')[3]}`,
                headers: { 'Authorization': `Token ${Cookie.get('token')}` },
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
            this.getPlaylistInfo();

            this.handleClickSnack()
            console.log(response);
            // this.setState({cloneSucceess:true})
            // window.location.replace("/playlistPage/" + this.state.selected)
        });
    }

    Playsong = (URL, bool, name, image, artist) => {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data.songs||[];
                console.log(response.data.songs)
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topPlaylists: updatedtopMusic });
            })
        if(URL.includes('tracks')){
          Cookie.set('url',URL);
          this.playHandler(URL,true,name,image)
  
          console.log(URL, bool, name, image, artist)
          this.setState({ selectedUrl: URL, SpotifyOrSoundcloudP: true, selectedname: name, selectedImage: image, selecteartist: artist });
        }
        else{
          Cookie.set('url',URL);
          this.playHandler(URL,false,name,image)
  
          console.log(URL, bool, name, image, artist)
          this.setState({ selectedUrl: URL, SpotifyOrSoundcloudP: false, selectedname: name, selectedImage: image, selecteartist: artist });
        }}  
        playHandler = (URL,bool,name,image) => {
            this.setState({      
              selectedUrlX: URL,
              SpotifyOrSoundcloud:bool,
              selectedname:name,
              selectedImage:image  ,   
            })
          }    
          ReloadSongs = (URL, bool, name, image, artist) => {
            axios({
                method: 'get',
                url: `http://localhost:8000/api/v1/playlist/${this.state.selected}/${window.location.pathname.split('/')[3]}`,
                headers: { 'Authorization': `Token ${Cookie.get('token')}` },
            })
                .then(response => {
                    const topMusic = response.data.songs||[];
                    console.log(response.data.songs)
                    const updatedtopMusic = topMusic.map(post => {
                        return {
                            ...post,
                        }
                    });
                    this.setState({ topPlaylists: updatedtopMusic });
                })
       } 
       
       childHandler=()=>{
           this.setState({opensuccess: true })
       }
    render() {
        const { classes } = this.props;
        let tags = this.state.tags.map(post => {
            return post.name;
        });
        let topPlaylists = this.state.topPlaylists.map(post => {
            return <Playlistsong
              action={this.childHandler}
              key={post.id}
              title={post.track_name}
              image={post.image}
              url={post.track_url}
              artist={post.artist_name}
              ids={post.platform}
              id={post.id}
              location={'playlistpage'}
              
              onclick={() => this.Playsong(post.track_url, true, post.track_name, post.image, post.artist_name)}              
              Reaload={() => this.ReloadSongs(post.track_url, true, post.track_name, post.image, post.artist_name)}                />;
            });
        let topMusic = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            topMusic = this.state.topMusic.map(post => {
                return <TopMusic
                    key={post.id}
                    title={post.title}
                    image={post.image}
                    url={post.id}
                    songs={post.songs.length}
                    clicked={() => this.SelectedHandler(post.id)} />;
            });
        }
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <div className="playlistpage" >
                    {this.state.loading?
                    <div style={{display: "flex",
                    fontFamily:'Open Sans',

                    justifyContent: "center",
                    alignItems: "center",
                    height:'80%'}}>
                        <CircularProgress disableShrink />
                         Loading ...
                    </div>
                 
                :null
                }   
                                    {this.state.loading===false?
                        <Grid container>
                    <Grid container item xs={12} sm={12} lg={8}  >
                    <Grid item xs={5} sm={6} lg={6}>
                    <Grid container>
                                    <Grid item xs={12} sm={12} lg={12}>
                                <h1 style={{ fontSize: 25, fontFamily: 'Open Sans',marginRight:40,height:110 }}> 

                                            {this.state.name}
                                                        {(tags || []).map(item => (<p style={{fontSize:18, margin: 1 }} key={item}>#{item}</p >))}
                                                        </h1>
                                                        </Grid>
                                                        <Grid item xs={12} sm={12} lg={12}>

                                                        <div style={{display:'flex',flexWrap:'nowrap'}} >

                                <h1 style={{ fontSize: 30, fontFamily: 'Open Sans',marginRight:40 }}> songs </h1>
                               
                                </div>
                                </Grid>
                                </Grid>
                                            </Grid>
                                            <Grid item xs={5} sm={5} lg={5}>
                                            <div 
                  style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundColor:'#000' }} >
                                                        <img
                                                            src={this.state.image||headerImage}
                                                            style={{ 
                                                                maxWidth:'100%',
                                                                height:'auto',
                                                                maxHeight:200
                                                            }}
                                                            />
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={1} sm={1} lg={1}  >

                                                <div style={{marginTop:-15}}>
                                                {window.location.pathname.split('/')[3]===Cookie.get('userid')?
                                                <div>
                                                    <Tooltip title="delete">
                                                        <IconButton
                                                            variant="contained"
                                                            className="delete"
                                                            style={{ backgroundColor: 'default', borderRadius: 100, marginRight: 10, margin: 0 }}
                                                            // containerElement={Link} to={'/delete'}
                                                            onClick={this.handleClickOpenDel}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip >

                                                    <br />
                                                    <Tooltip title="edit">
                                                        <IconButton
                                                            variant="contained"
                                                            className="edit"
                                                            style={{ backgroundColor: 'default', borderRadius: 100, marginRight: 10, margin: 0 }}
                                                            // containerElement={Link} to={'/edit'}
                                                            onClick={this.handleClickOpenEdit}
                                                        >
                                                            <EditIcon  />
                                                        </IconButton>

                                                    </Tooltip>

                                                    <br />
                                                    <Tooltip title="post">
                                                        <IconButton
                                                            variant="contained"
                                                            className="edit"
                                                            style={{ backgroundColor: 'default', borderRadius: 100, marginRight: 10, margin: 0 }}
                                                            onClick={this.handleClickOpenAdd}
                                                        >
                                                            <Post />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <br />
                                                    <Tooltip title="clone" >
                                                        <IconButton 
                                                            variant="contained"
                                                            className={classes.margin}                                                            
                                                            style={{ backgroundColor: 'default', borderRadius: 100, marginRight: 10, margin: 0 }}
                                                            onClick={this.handleClone}
                                                            // containerElement={Link} to={this.handleClone}
                                                        >
                                                            <CloudIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <br/>
                                                    <Tooltip title="Share" >
                                                        <IconButton 
                                                            variant="contained"
                                                            className={classes.margin}                                                            style={{ backgroundColor: 'default', borderRadius: 100, marginRight: 10, margin: 0 }}
                                                            onClick={this.handleClickOpenShare}
                                                            // containerElement={Link} to={this.handleClone}
                                                        >
                                                            <Share  />
                                                        </IconButton>
                                                    </Tooltip>
                                                    </div>
                                                    :null
                                                }

                                                    <Snackbar 
                                                    style={{zIndex:100000}}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}           open={this.state.open}
                                                    autoHideDuration={4000}
                                                    onClose={this.handleClose}  message="playlist is cloned" ></Snackbar>
                                                     <Snackbar 
                                                                                                         style={{zIndex:100000}}

                                                     anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}           open={this.state.openLinkvalidation}
                                                    autoHideDuration={4000}
                                                    onClose={this.handleClose}  >
                                                         <MySnackbarContentWrapper
                                                                                                             style={{zIndex:100000}}

            onClose={this.handleClose}
            variant="error"
            message="Your link is invalid!"
          />
        </Snackbar>
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
          <Snackbar 
                                                              style={{zIndex:100000}}
                                                              anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}           open={this.state.opensuccess}
                                                    autoHideDuration={4000}
                                                    onClose={this.handleClose}  >
                                                         <MySnackbarContentWrapper
                                                                                                             style={{zIndex:100000}}

            onClose={this.handleClose}
            variant="error"
            message="music is deleted!"
          />
        </Snackbar>
                                                </div>
                                            </Grid>                                                                         
                                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div >
                                    {this.state.topPlaylists.length===0?
                                     <div style={{display:'flex',flexWrap:'wrap'}} >
                                     <Typography variant="h6" style={{marginTop:10, fontFamily:'Open Sans', alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                 Your playlist is empty 
                            </Typography>           
                          </div>           
                                    : <PerfectScrollbar >
                                    {topPlaylists}
                                    </PerfectScrollbar >

                                    }
                                   
                                        </div>
                                        </Grid>
                                        {window.location.pathname.split('/')[3]===Cookie.get('userid')?
                                        <Grid  container  xs={12} sm={12} md={12} lg={12} >
                                        <Grid  item xs={10} sm={11} lg={11}>

      <div style={{ height:15, display:'flex',flexWrap:'nowrap',width:'100%'}}>
      <TextField onChange={this.handleChange} value={this.state.linkName} rowsMin={1}  rowsMax={1}  aria-label="caption" placeholder="Enter your spotify/soundcloud link" style={{paddingBottom:10, paddingTop:10, fontSize:15, width:'110%'}} />

      </div>
      </Grid>
     
                <Grid  item xs={1} sm={1} lg={1}>
      <Button  onClick={this.handleLink} style={{fontFamily:'Open Sans',marginTop:10}} color="secondary"
>
  Add
</Button>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} >
          <p style={{color:"rgba(0,0,0,0.4)",fontFamily:'Open Sans',fontSize:10}}>Your link should start with https://open.spotify.com/ or https://soundcloud.com/</p>
          </Grid>
          </Grid>

      :null
                                                }

                            <Grid item xs={12} sm={12} md={12} lg={11} style={{marginTop:-10}}>
                                <If condition={this.state.topMusic.length > 4}>
                                    
                                    <div style={{ height: '300px' }}>
                                        <h2 style={{ fontSize: 30, lineHeight: 0.01,fontFamily:('Open Sans')}}></h2>
                                        <HorizontalScroll  >
                                            {/* {topMusic} */}
                                        </HorizontalScroll>
                                    </div>
                                </If>
                                <If condition={this.state.topMusic.length < 4||this.state.topMusic.length == 4}>
                                    <h2 style={{ fontSize: 30, lineHeight: 0.01 }}> </h2>

                                    <div style={{overflowX:'auto' ,display: 'flex', flexWrap: 'nowrap', height: '320px' }}>
                                        {/* {topMusic} */}
                                    </div>
                                </If>

                            </Grid>
                        </Grid>
                        <Grid item lg={4}>
                        <div className="Topspotifymusicscroll" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:-10,marginLeft:35,paddingLeft:10 , width: '23%', height: '100%'}}>
                <h2 style={{fontFamily:'Open Sans', fontSize: 25,marginTop:25, lineHeight: 0.01 }}> Playlists </h2 >
                <hr style={{width:'100%'}} />
                <div style={{position:'fixed',marginTop:0,marginLeft:0, width: '23%', height: '76%'}}>
                        <FreeScrollbar  >
                  {topMusic}
                </FreeScrollbar>
                </div>
                </div>
                        </Grid>
                        </Grid>
                        :null}
                    </div>
                    <Grid item xs={12} sm={12} lg={12}>
            <header  >
            {this.state.selectedUrl ?
                <div className="player1">
                  {this.state.SpotifyOrSoundcloud === true ?
                    <iframe  title={this.state.selectedUrl} frameBorder="no" width="100%" height="80" scrolling="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/" + this.state.selectedUrl + "&color=%23848484&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"}></iframe>
                    : <iframe title={this.state.selectedUrl} frameBorder="no" src={'https://open.spotify.com/embed/' + this.state.selectedUrl }
                      width="100%" height="80"  allowtransparency="true" allow="encrypted-media" />
                  }
                </div>
                : null
              }
              {this.state.selectedUrl ?
                <div className="player">
                  {this.state.SpotifyOrSoundcloud === true ?
      <iframe width="90%" height="300" scrolling="no" frameborder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'+ this.state.selectedUrl +'&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>     
      : <iframe  src={'https://open.spotify.com/embed/' + this.state.selectedUrl}
      width="90%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media" />
                  }
                </div>
                : null
              }
            </header>
          </Grid> 
          <Dialog
          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openEdit}
                onClose={this.handleCloseEdit}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">           
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
            Edit playlist info</Typography>
                </DialogTitle>
                <DialogContent style={{marginBottom:20}}>
                <EditPlaylist
                                                            {...this.props}
                                                            togglePopUpEdit={this.handleCloseEdit}
                                                            onSuccessFullySave={() => {
                                                                this.handleCloseEdit()}}
                                                            />
                
                </DialogContent>
              </Dialog>
              <Dialog
          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openDel}
                onClose={this.handleCloseDel}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">           
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
            Do you want to delete this playlist?</Typography>
                </DialogTitle>
                <DialogContent style={{marginBottom:20}}>
                <DeletePlaylist
                                                            {...this.props}
                                                            selected={this.state.selected}
                                                            action={this.handle}
                                                            togglePopUpDelete={this.handleClickOpenDel}
                                                            onSuccessFullySave={() => {
                                                                this.handleCloseDel()}}
                                                            />
                
                </DialogContent>
              </Dialog>
          <Dialog
          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openAdd}
                onClose={this.handleCloseAdd}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">           
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
            Create post</Typography>
                </DialogTitle>
                <DialogContent style={{marginBottom:20}}>
                <Postpopup
                PlaylistId={this.state.selected}
                                                        image={this.state.image}
                                                            {...this.props}
                                                            togglePopUpPost={this.handleClickOpenAdd}
                                                        />
                
                </DialogContent>
              </Dialog>
              <Dialog
          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openShare}
                onClose={this.handleCloseShare}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">           
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
           Share</Typography>
                </DialogTitle>
                <DialogContent style={{marginBottom:20}}>
       <Facebook  link={window.location}/>
    <br/>
          <Twitter link={"Listen to my playlist in COMU. "+window.location} />
    <br/>
               <CopyToClipboard text={window.location}>
    <Button onClick={this.handleCloseShare}>
    <Typography variant='body1' align='center' style={{marginLeft:0,marginTop:0, fontSize:15,fontFamily:'Open Sans'}} >
    <Link/>
          </Typography>
          <Typography variant='body1' align='center' style={{marginLeft:10,marginTop:0, fontSize:15 ,fontFamily:'Open Sans'}} >
          Copy Link
          </Typography>
    </Button>
  </CopyToClipboard>
                </DialogContent>
              </Dialog>
                </div>
            </ThemeProvider>

        );
    }
}
playlistPage.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles2)(playlistPage);