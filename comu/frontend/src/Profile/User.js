import React, { useState, useEffect } from "react";
import { makeStyles, useTheme , withStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Edit from "./edit";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./profile.css";
import Typography from "@material-ui/core/Typography";
import Cookie from "js-cookie";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Badge from '@material-ui/core/Badge';
import TextField from "material-ui/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import headerImage from "../bokeh.jpg";
import MusicNoteTwoToneIcon from "@material-ui/icons/MusicNoteTwoTone";
import Draggable from "react-draggable";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";
import FreeScrollBar from "react-free-scrollbar";
import HorizontalScroll from "react-scroll-horizontal";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Post from "../post";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Favorite from "@material-ui/icons/Favorite";
import Comment from "@material-ui/icons/Comment";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddPlaylist from "../addmusic";
import CreateIcon from "@material-ui/icons/Create";
import { withRouter } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { If } from "rc-if-else";
import { unFollowUser } from "./api";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import LinesEllipsis from 'react-lines-ellipsis';
import CircularProgress from '@material-ui/core/CircularProgress';
import story from "../story";

const FormData = require('form-data');


const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "rgba(228, 233, 237, 0.4)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexGrow: 1,
     //display: "flex",
    // flexDirection: "row-reverse",
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    top: theme.spacing(13),
    left: theme.spacing(4.3),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      top: theme.spacing(7),
      left: theme.spacing(18.5),
    },
  },
  input: {
    backgroundColor: "rgba(228, 233, 237, 0.5)",
  },
  paper: {
    width: theme.spacing(86.5),
    height: theme.spacing(22),
    // backgroundColor: "rgba( 255,255,255, 0.1)",
    backgroundColor: "rgba(191, 191, 191, 0.5)",
    backgroundImage: 'url("./cccc.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      height: theme.spacing(12),

    },
  },
  paper6: {
    width: theme.spacing(86.5),
    height: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      width: "100%",
      height: theme.spacing(10),

    },
  },
  paper7:{
    marginTop:theme.spacing(1),
  },
  paper1: {
    // marginTop: theme.spacing(1),
    // width: theme.spacing(104),
    backgroundColor: "rgba( 255,255,255, 0.1)",
    // height: theme.spacing(28),

    // marginLeft: theme.spacing(30),

    // display: "flex",
    // flexDirection: "row",
  },
  paper2: {
    // marginTop: 10,
    // height: theme.spacing(80),
  },
  paper3: {
    margin: theme.spacing(50),
  },
  paper4: {
     marginRight: "10px",
  },
  paper5: {
    marginLeft: "2px",
    height: theme.spacing(200),
  },
  typography: {
    color: "rgba(30, 139, 195, 1)",
  },
  button1: {
    color: "grey",
    left: "280px",
    bottom: "2px",
    fontSize: 11,
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(-0.5),
    },
  },
  button2: {
    color: "grey",
    left: "280px",
    bottom: "2px",
    fontSize: 11,
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(9),
    },
  },
  button: {
    color: "grey",
    marginLeft: "-13px",
    top:-42,
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(0.5),
      top:-25
    },
  },
  media: {
    height: 200,
    width: 200,
  },
  paper3: {
    marginLeft: 6,
  },
  iconButton: {
    marginLeft: 20,
  },
  iconButto: {
    marginTop: "270px",
    marginLeft: "100px",
    [theme.breakpoints.down('xs')]: {
      marginTop: "110px",
      marginLeft: "300px",
    },
  },
  card: {
    left: 1,
    top: 10,
  },
  input: {
    left: 85,
  },
  margin: {
    backgroundColor: "white",
    color: "#4361ee",
    size: "10",
    fontSize: 12,
  },
  grid: {
    width: "21%",
    maxWidth: "21%",
  },
  margin1: {
    color: "grey",
    left: "590px",
    top: "-30px",
    [theme.breakpoints.down('xs')]: {
      left: "250px",
      top: "0px",

    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      //id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
function User() {
  const classes = useStyles();
  const theme = useTheme();
  const token = Cookie.get("token");
  const userid = window.location.pathname.split('/')[2]
  const FormData = require("form-data");

  const [openn, setOpenn] = React.useState(false);
  const [checked, setChecked] =  useState({
    playlist:"",
    song:[],
  });
  const [opennn, setOpennn] = React.useState(false);
  const [followCheck, setfollowCheck] = React.useState(false);
  const [opennnn, setOpennnn] = React.useState(false);
  const [opennnnn, setOpennnnn] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [songs, setSongs] = useState([]);
  const [childHandler, setchildHandler] = useState({
    selectedUrl: null,
    SpotifyOrSoundcloud: false,
    selectedname: null,
    selectedImage: null,
    showPlayer: false,
  });
  const [playHandler, setplayHandler] = useState({
    selectedUrlX: null,
    SpotifyOrSoundcloud: false,
    selectedname: null,
    selectedImage: null,
  });
  let [state, setState] = useState({
    username: null,
    firstname: null,
    followers: null,
    following: null,
    followin:null,
    id: null,
    userid: Cookie.get("userid"),
  });
  const [posts, setPosts] = useState([]);
  const [req, setReq] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [stories, setStories] = useState([]);
  const [followin, setFollowin] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);
  const [postLentgh, setpostLentgh] = useState();
  const [storyUrl, setStoryUrl] = useState();
  const [playlistLentgh, setplaylistLentgh] = useState();
  const [followerLentgh, setfollowerLentgh] = useState();
  const [followingLentgh, setfollowingLentgh] = useState();
  const [selectedProfile, setselectedProfile] = useState(Cookie.get("userid"));
  const [uuuser, setUser] = useState({ user: "" });
  let [follow, setFollow] = useState({
    id: null,
  });
  const togglePopUpAdd = () => {
    setchildHandler({ showPlayer: !childHandler.showPlayer });
  };

  let [profilepic, setProfilepic] = useState({
    imagee: null,
    header:null,
    bio: "",
    profile_status:"",
  });
  const [value, setValue] = React.useState(0);

  const handleClickOpenn = () => {
    setOpenn(true);
  };
  const handleClickOpennn = () => {
    setOpennn(true);
  };
  const handleClickOpennnn = () => {
    setOpennnn(true);
  };
  const handleClickOpennnnn = () => {
    setOpennnnn(true);
  };
  const handleClosee = () => {
    setOpenn(false);
  };
  const handleCloseee = () => {
    setOpennn(false);
  };
  const handleCloseeee = () => {
    setOpennnn(false);
  };
  const handleCloseeeee = () => {
    setOpennnnn(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpenAdd = () => {
    setOpenAdd(true)
  };

  const handleCloseAdd = () => {
    setOpenAdd(false)
  };
  
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange2 = (event) => {
    let value = event.target.value;
    setUser({ user: value });
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    searchUsers();
  }, [uuuser]);

  useEffect(() => {
    const userList = () => {
      axios
        .get("http://localhost:8000/api/v1/accounts/users/", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          if (users == [null]) {
            setUsers([]);
          } else {
            setUsers(res.data);
            console.log(res.data)
          }
        })
        .catch((error) => {});
    };
    userList();
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      axios({
        method: "get",
        url: `http://localhost:8000/api/v1/playlist/${userid}`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${Cookie.get("token")}`,
        },
      }).then((res) => {
        setplaylistLentgh(res.data.length);
        setPlaylist(res.data);
        console.log(res.data)
       
      });
    };
    handlePlay();
  }, []);
  useEffect(() => {
    handlePlayprofile();
  }, []);
  const handlePlayprofile = () => {
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setState({
          imagee: res.data.profile_picture,
          followers: res.data.follower_num,
          following: res.data.following_num,
          username: res.data.username,
          firstname: res.data.first_name,
        });
      })
      .catch((error) => {});
  };
  useEffect(() => {
    const getFollowReq = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/followrequest/${userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          if (req == [null]) {
            setReq([]);
          } else {
            setReq(res.data);
          }
        })
        .catch((error) => {});
    };
    getFollowReq();
  }, []);
  useEffect(() => {
    const getFollowers = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/followers/${userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          for(var i = 0; i<res.data.length; i++)
          if(res.data[i].username===Cookie.get('username'))
          {
            setfollowCheck(true)
            break
          }
          setfollowerLentgh(res.data.length);
          if (followers == [null]) {
            setFollowers([]);
          } else {
            setFollowers(res.data);
          }
        })
        .catch((error) => {});
    };
    getFollowers();
  }, []);
  useEffect(() => {
    const getStories = () => {
      axios
        .get(`http://localhost:8000/api/v1/stories/profile/list/${userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          setStories(res.data)
          setStoryUrl(res.data[0].song[0].track_url)
        })
        .catch((error) => {});
    };
    getStories();
  }, []);
  useEffect(() => {
    const getFollowing = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/following/${userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          setfollowingLentgh(res.data.length);
          if (following == [null]) {
            setFollowing([]);
          } else {
            setFollowing(res.data);
          }
        })
        .catch((error) => {});
    };
    getFollowing();
    const getFollowin = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
         
          setfollowingLentgh(res.data.length);
          if (followin == [null]) {
            setFollowin([]);
          } else {
            setFollowin(res.data);
          }
        })
        .catch((error) => {});
    };
    getFollowin();
  }, []);
  useEffect(() => {
    handleprofilepic();
  }, []);
  const handleprofilepic = () => {
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/profile/${userid}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setProfilepic({
          header:res.data.header_picture,
          bio: res.data.bio,
          imagee: res.data.profile_picture,
          profile_status:res.data.profile_status
        });
      })
      .catch((error) => {});
  };
  useEffect(() => {
    handlePosts();
  }, []);
  const handlePosts = () => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/v1/posts/profile/list/${userid}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${Cookie.get("token")}`,
      },
    }).then((res) => {
      setpostLentgh(res.data.length);
      setPosts(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    handle();
  }, []);
  const handle = () => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/v1/posts/profile/list/${userid}`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${Cookie.get("token")}`,
      },
    }).then((res) => {
      setpostLentgh(res.data.length);
      setPosts(res.data);
      setLoading(false);
    });
  };
  const searchUsers = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/v1/accounts/users/?search=${uuuser.user}`,
        {
          headers: {
            Authorization: `Token ${Cookie.get("token")}`,
          },
        }
      );
      if (search == [null]) {
        setSearch([]);
      } else {
        setSearch(result.data);
      }
    } catch (err) {}
  };
  
  const postStory=(event)=>{
    let formData = new FormData(); //formdata object

    formData.append("song[0]track_name",checked.song)
     formData.append("playlist",checked.playlist);
     console.log(formData.get(playlist))
const config = {
headers: { 'content-type': 'multipart/form-data',
Authorization: `Token ${Cookie.get("token")}` }
}

axios.post(`http://localhost:8000/api/v1/stories/create/`, formData, config)
.then(response => {
  setOpennnn(false);
  const getStories = () => {
    axios
      .get(`http://localhost:8000/api/v1/stories/profile/list/${userid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        setStories(res.data)
        setStoryUrl(res.data[0].song[0].track_url)
      })
      .catch((error) => {});
  };
  getStories();
})
.catch(error => {
console.log(error);
});
  //   {let formData = new FormData();
  //     formData.append("song[0]track_name",checked.song)
  //     formData.append("playlist",checked.playlist);
  //     console.log(checked.playlist,checked.song);
  //     console.log(formData.get(playlist))
  //   axios
  //   .post(`http://localhost:8000/api/v1/stories/create/`, 
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Token ${Cookie.get("token")}`},
  //       data:formData
  //   })
  //   .then((res) => {
  //     setOpennnn(false);
  //   })
  //   .catch((error) => {});
  // }
  }
  const ChildHandler = (URL, bool, name, image) => {
    setchildHandler({
      selectedUrl: URL,
      SpotifyOrSoundcloud: bool,
      selectedname: name,
      selectedImage: image,
      showPlayer: !childHandler.showPlayer,
    });
    handleClickOpenAdd()
  };
  const PlayHandler = (URL, bool, name, image) => {
    setplayHandler({
      selectedUrlX: URL,
      SpotifyOrSoundcloud: bool,
      selectedname: name,
      selectedImage: image,
    });
  };

  const checkIsFollowingOrNot = (userId) => {
    return !!followin.filter((item) => item.id === userId).length;
  };

  const renderTitle = (item) => {
    if(!item.songs.length){
      return;
    }
    return <div className="story">{item.title}</div>
  }

  return (

    <div className="pro">
        {loading?
                    <div style={{display: "flex",
                    fontFamily:'Open Sans',

                    justifyContent: "center",
                    alignItems: "center",
                    height:'80%'}}>
                        <CircularProgress disableShrink />
                         Loading ...
                    </div>
                 
                :  <Grid container >
                {/* <div className={classes.root}>
                  <Grid container direction="row " justify="space-between"> */}
                  <Grid container item xs={12} sm={12} md={9} lg={9}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Paper elevation={1} style={{backgroundImage:` url(${profilepic.header})`,}}className={classes.paper}>
                      <div>
                      <Grid container>
                      <Grid item xs={6} sm={6} md={6} lg={4}>
                        <div  className="navbar">
                      <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={<Tooltip title="add story">
                                                   <If condition={window.location.pathname.split('/')[2]===Cookie.get('userid')}>

                  <IconButton
                  style={
{                    backgroundColor:'white',
marginTop:20,marginLeft:15
}                  }
                  size="small"
                    color="primary"
                    type="submit"
                    aria-label="add"
                    onClick={handleClickOpennnn}
                  >
                    <AddIcon />
          
                  </IconButton>
                  </If>

                </Tooltip>}
                >
                  <If condition={storyUrl!==undefined}>
                    <div 
                                                                  className={classes.large}

                    style={{backgroundColor:'#303f9f',marginTop:104,marginLeft:34,padding:5,borderRadius:1000}}

                    onClick={handleClickOpennnnn}
                  >
                        <Avatar
                          src={profilepic.imagee}
                          style={{marginTop:-104,marginLeft:-34}}
                          className={classes.large}
                        ></Avatar>
                        </div>
                        </If>
                        <If condition={storyUrl===undefined}>
                        <div 
                                                                  className={classes.large}

                    style={{marginTop:104,marginLeft:34,padding:5,borderRadius:1000}}

                  >
                        <Avatar
                          src={profilepic.imagee}
                          style={{marginTop:-104,marginLeft:-34}}
                          className={classes.large}
                        ></Avatar>
                        </div>
                        </If>
                         </Badge>
                         </div>
                         <div  className="bottombar">
                      <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={<Tooltip title="add story">
                  <IconButton
                  style={
{                    backgroundColor:'white',
}                  }
                  size="small"
                    color="primary"
                    type="submit"
                    className={classes.iconButto}
                    aria-label="add"
                    onClick={handleClickOpennnn}
                  >
                               <If condition={window.location.pathname.split('/')[2]===Cookie.get('userid')}>
                    <AddIcon />
                    </If>
          
                  </IconButton>
                </Tooltip>}
                >
                    <div 
                                                                  className={classes.large}


                    onClick={handleClickOpennnnn}
                  >
                        <Avatar
                          src={profilepic.imagee}
                          className={classes.large}
                        ></Avatar>
                        </div>
                         </Badge>
                         </div>
                         </Grid>
                        <Dialog
                         style={{marginTop:50,maxHeight:520,zIndex:10000}}
                          open={opennnn}
                          onClose={handleCloseeee}
                          PaperComponent={PaperComponent}
                          aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                         
                            style={{ cursor: "move" ,textAlign: "center",fontSize:14,color:"primary"}}
                            id="draggable-dialog-title"
                          >
                            Choose the song that 
                            <br/>
                            you want to story
                          </DialogTitle>
                          <DialogContent>
                            {playlist.length===0?
                            <div>
                              <Typography variant="h6" style={{marginTop:10, fontFamily:'Open Sans', alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                        Please create playlist
                     </Typography>        
                             </div>
                             :null
                            }
                          {playlist.map((item) => (
                          <Paper elevation={0} className={classes.paper7}>
                                  {
                                  renderTitle(item)
                                  }
                                  {item.songs.map((it) => (
                                 
                          <Card
                                //key={it.id}
                                style={{
                                  backgroundColor: "white",
                                  maxWidth: 264,
                                  minWidth: 264,
                                  maxHeight: 60,
                                  minHeight: 60,
                                  marginLeft: 3,
                                  marginTop: 2,
                                }}
                              >
                                
                                <CardContent className={classes.card}>
                                  
                                <LinesEllipsis style={{fontFamily: "Roboto",
                                      marginTop: -6,
                                      fontSize: 12,
                                      marginLeft: 50,}}
                                text={it.track_name}
                                maxLine='1'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                                />
                                  {/* <FormControlLabel
                                  control={
                                <Checkbox
                                value={it.track_name}
                                value1={item.id}
                                size="small"
                                style={{marginLeft:"220px",borderRadius: 6,marginBottom:30,
                                width: 11,
                                height: 11,}}
                            onChange={(event) => {
                              setChecked({
                                checked:{
                                playlist:  event.target.value1,
                                song: event.target.value,}
                              });
                              console.log(event.target.value1,event.target.value) 
                            }}
                             inputProps={{ 'aria-label': 'primary checkbox' }}
                             color="primary" 
                                  />
                                  }
                                 /> */}
                                 
                                 <FormControl component="fieldset">
                 <RadioGroup  aria-label="gender" name="gender1"  value={checked.song}
                onChange={(event) => {
                              setChecked({
                                playlist:  item.id,
                                song: it.track_name
                              });
                            }}>
                               <FormControlLabel value={it.track_name} control={<Radio style={{marginLeft:"225px",borderRadius: 6,marginBottom:30,
                                width: 11,
                                height: 11,}} color="primary" />} />
                </RadioGroup>
              </FormControl>
           
                                  <Avatar
                                  variant="square"
                                  src={it.image}
                                  
                                    style={{
                                      width: 48,
                                      height: 48,
                                     bottom: 80,
                                      left: -5,
                                    }}
                                  />
                                  
                                </CardContent>
                              </Card>
          ))}
                                {/* </CardContent> */}
                              </Paper>
                            ))}
                          </DialogContent>
                          <DialogActions>
                            <Button 
                            onClick={postStory}
                             color="primary">
                              Send
                            </Button>
                          </DialogActions>
                        </Dialog>
                        <Grid item xs={6} sm={6} md={6} lg={6} className="navbar">
                        <Typography
                          variant="body1"
                          align="justify"
                          style={{
                            textAlign: "left",
                            marginLeft:-60,
                            fontFamily: "Roboto",
                            marginTop: "150px",
                            fontSize: 17,
                            color: "white",
                          }}
                        >
                          @{state.username}
                          {/* <br />
                          <CreateIcon color="primary" fontSize="small" />
                          {profilepic.bio} */}
                        </Typography>
                        <Typography
                          variant="body1"
                          align="justify"
                          style={{
                            textAlign: "left",
                            marginLeft:-50,
          
                            fontFamily: "Roboto",
                            fontSize: 15,
                            color: "grey",
                          }}
                        >
                          {/* <CreateIcon color="grey" fontSize="small" /> */}
                          {state.firstname}
                        </Typography>
                        </Grid>              
                        <Grid item xs={6} sm={6} md={6} lg={6} className="bottombar">
          
          <Typography
            variant="body1"
            align="justify"
            style={{
              textAlign: "left",
              marginLeft:-35,
              fontFamily: "Roboto",
              marginTop: "130px",
              fontSize: 15,
              color: "black",
            }}
          >
            @{state.username}
            {/* <br />
            <CreateIcon color="primary" fontSize="small" />
            {profilepic.bio} */}
          </Typography>
          <Typography
            variant="body1"
            align="justify"
            style={{
              textAlign: "left",
              marginLeft:-25,
          
              fontFamily: "Roboto",
              fontSize: 15,
              color: "grey",
            }}
          >
            {/* <CreateIcon color="grey" fontSize="small" /> */}
            {state.firstname}
          </Typography>
          </Grid>              
                        <Dialog
                        style={{marginBottom:5,zIndex:100000}}
                          open={open}
                          onClose={handleClose}
                          scroll={scroll}
                          aria-labelledby="scroll-dialog-title"
                          aria-describedby="scroll-dialog-description"
                        >
                          <DialogTitle id="scroll-dialog-title">Edit Profile</DialogTitle>
                          <DialogContent dividers={scroll === "paper"}>
                            <Edit
                              onSuccessFullySave={() => {
                                handleClose();
                                handlePlayprofile();
                                handleprofilepic();
                              }}
                            />
                          </DialogContent>
                        </Dialog>
                        </Grid>
                        </div>
                      </Paper>
                      <Paper elevation={2} className={classes.paper6}>
                        {/* <ButtonGroup
                          variant="text"
                          className={classes.button1}
                          aria-label="contained primary button group"
                        > */}
                                      <Grid item xs={12} sm={12} md={12} lg={12}>
          
                        <Button size="small" 
                        style={{fontFamily:'Open Sans'}}
                        className={classes.button1}>
                          Following
                          <br /> {following.length}
                        </Button>
                        <Button size="small"
                          style={{fontFamily:'Open Sans'}}
                         className={classes.button1}>
                          Followers <br />
                          {followerLentgh}
                        </Button>
          
                        <Button size="small" 
                         style={{fontFamily:'Open Sans'}}
                        className={classes.button2}>
                          Posts <br />
                          {postLentgh}
                        </Button>
                        <Button size="small"
                          style={{fontFamily:'Open Sans'}}
                         className={classes.button2}>
                          Playlists <br />
                          {playlistLentgh}
                        </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <If condition={window.location.pathname.split('/')[2]===Cookie.get('userid')}>
          
                        <Button
                          className="req"
                          variant="outlined"
                          size="small"
                          color="default"
                          onClick={handleClickOpennn}
                          className={classes.margin1}
                          style={{fontFamily:'Open Sans'}}
                        >
                          requests
                        </Button>
                        </If>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <If condition={window.location.pathname.split('/')[2]!==Cookie.get('userid')}>
                        <Button
                          className="req"
                          variant="outlined"
                          size="small"
                          color="default"
                          className={classes.margin1}
                          style={{fontFamily:'Open Sans'}}
                          onClick={
                            followCheck 
                                          ? async () => {
                                              await axios
                                                .delete(
                                                  `http://localhost:8000/api/v1/accounts/users/unfollow/${userid}`,
          
                                                  {
                                                    headers: {
                                                      Authorization: "Token " + token,
                                                    },
                                                  }
                                                )
          
                                                .then((res) => {
                                                  setfollowCheck(false)
                                                  axios
                                                    .get(
                                                      "http://localhost:8000/api/v1/accounts/users/",
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setUsers(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // const getFollowing = () => {
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setfollowingLentgh(res.data.length);
                                                      setFollowin(res.data);
                                                    });
                                                  // getFollowing();
                                                  // };
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setState({
                                                        followers: res.data.follower_num,
                                                        following: res.data.following_num,
                                                        imagee: res.data.profile_picture,
                                                        username: res.data.username,
                                                        firstname: res.data.first_name,
                                                      });
                                                    })
          
                                                    .catch((error) => {});
                                                })
          
                                                .catch((error) => {});
                                            }
                                          : async () => {
                                              await axios
                                                .patch(
                                                  `http://localhost:8000/api/v1/accounts/users/follow/${userid}`,
                                                  follow.id,
                                                  {
                                                    headers: {
                                                      Authorization: "Token " + token,
                                                    },
                                                  }
                                                )
                                                .then((res) => {
                                                  setfollowCheck(true)

                                                  axios
                                                    .get(
                                                      "http://localhost:8000/api/v1/accounts/users/",
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setUsers(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // const getFollowing = () => {
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setfollowingLentgh(res.data.length);
                                                      setFollowin(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // };
                                                  checkIsFollowingOrNot(userid)
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setState({
                                                        followers: res.data.follower_num,
                                                        following: res.data.following_num,
                                                        imagee: res.data.profile_picture,
                                                        username: res.data.username,
                                                        firstname: res.data.first_name,
                                                      });
                                                    })
          
                                                    .catch((error) => {});
                                                })
                                                .catch((error) => {});
                                            }
                                      }
                                    >
                                       {followCheck ? "unFollow" : profilepic.profile_status==="private" ? "Request" :"Follow"}
                                    </Button>
                        </If>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <If condition={window.location.pathname.split('/')[2]===Cookie.get('userid')}>
          
                        <Button
                          onClick={handleClickOpen("paper")}
                          // variant="contained"
                          className={classes.button}
                          startIcon={<SettingsIcon />}
                        ></Button>
                                      </If>
                                      </Grid>
                                      
                        <Dialog
                                  style={{zIndex:100000000}}
                          open={opennn}
                          onClose={handleCloseee}
                          PaperComponent={PaperComponent}
                          aria-labelledby="draggable-dialog-title"
                        >
                          <DialogTitle
                            style={{ cursor: "move" }}
                            id="draggable-dialog-title"
                          >
                            Follow Requests
                          </DialogTitle>
                          <DialogContent>
                            {req.length === 0 && (
                              <p
                                style={{
                                  textAlign: "center",
                                  fontFamily: "Roboto",
                                }}
                              >
                                You don't have any follow requests!
                              </p>
                            )}
                            {req.map((item) => (
                              <Card
                                key={item.id}
                                style={{
                                  backgroundColor: "white",
                                  maxWidth: 260,
                                  minWidth: 260,
                                  maxHeight: 60,
                                  minHeight: 60,
                                  marginLeft: -7,
                                  marginTop: 3,
                                }}
                              >
                                <CardContent className={classes.card}>
                                  <Typography
                                    variant="body1"
                                    align="justify"
                                    style={{
                                      fontFamily: "Roboto",
                                      marginTop: -5,
                                      fontSize: 12,
          
                                      marginLeft: 50,
                                    }}
                                  >
                                    {item.username}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    align="justify"
                                    style={{
                                      fontFamily: "Roboto",
                                      fontSize: 11,
                                      color: "grey",
                                      marginLeft: 50,
                                    }}
                                  >
                                    {item.first_name}
                                    {item.last_name}
                                  </Typography>
          
                                  <Avatar
                                    src={item.profile_picture}
                                    style={{
                                      width: 48,
                                      height: 48,
                                      bottom: 38,
                                      left: -5,
                                    }}
                                  />
                                  <IconButton
                                  style={{marginTop: "-150px",
                                    marginLeft: "190px"}}
                                    type="submit"
                                    // className={classes.iconButton}
                                    aria-label="search"
                                    onClick={async () => {
                                      await axios
                                        .patch(
                                          `http://localhost:8000/api/v1/accounts/users/acceptfollowrequest/${item.id}`,
                                          follow.id,
                                          {
                                            headers: {
                                              Authorization: "Token " + token,
                                            },
                                          }
                                        )
                                        .then((res) => {
                                          
                                          // const getFollowing = () => {
                                          axios
                                            .get(
                                              `http://localhost:8000/api/v1/accounts/users/followers/${userid}`,
                                              {
                                                headers: {
                                                  "Content-Type": "multipart/form-data",
                                                  Authorization: `Token ${Cookie.get(
                                                    "token"
                                                  )}`,
                                                },
                                              }
                                            )
                                            .then((res) => {
                                              setfollowerLentgh(res.data.length);
                                              setFollowers(res.data);
                                            })
                                            .catch((error) => {});
                                            
                                              axios
                                                .get(`http://localhost:8000/api/v1/accounts/users/followrequest/${userid}`, {
                                                  headers: {
                                                    "Content-Type": "multipart/form-data",
                                                    Authorization: `Token ${Cookie.get("token")}`,
                                                  },
                                                })
                                                .then((res) => {
                                                  if (req == [null]) {
                                                    setReq([]);
                                                  } else {
                                                    setReq(res.data);
                                                  }
                                                })
                                                .catch((error) => {});
                                            
                                          // };
                                          axios
                                            .get(
                                              `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                              {
                                                headers: {
                                                  "Content-Type": "multipart/form-data",
                                                  Authorization: `Token ${Cookie.get(
                                                    "token"
                                                  )}`,
                                                },
                                              }
                                            )
                                            .then((res) => {
                                              setState({
                                                followers: res.data.follower_num,
                                                following: res.data.following_num,
                                                imagee: res.data.profile_picture,
                                                username: res.data.username,
                                                firstname: res.data.first_name,
                                              });
                                            })
          
                                            .catch((error) => {});
                                        })
          
                                        .catch((error) => {});
                                    }}
                                  >
                                    <CheckIcon color="primary" />
                                  </IconButton>
                                </CardContent>
                              </Card>
                            ))}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseee} color="primary">
                              ok
                            </Button>
                          </DialogActions>
                        </Dialog>
          
                        {/* </ButtonGroup> */}
                      </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Paper elevation={0} className={classes.paper1}>
                      {playlist.length!==0?
                      <If condition={window.location.pathname.split('/')[2]===Cookie.get('userid')||profilepic.profile_status==="public"||followCheck===true}>
                      <div className="navbar" >
                        {playlist.length<5?
                        <div className="navbar" style={{ height: "250px",display:'flex',flexWrap:'nowrap'}}>
                          {playlist.map((item) => (
                            //console.log(item.image),
                            <Card
                              key={item.id}
                              style={{
                                marginTop: 15,
                                maxWidth: 160,
                                minWidth: 160,
                                maxHeight: 200,
                                minHeight: 200,
                                marginleft: 10,
                                marginRight: 10,
                              }}
                              onClick={() =>
                                window.location.replace(`/playlistPage/${item.id}/${window.location.pathname.split('/')[2]}`)
                              }
                            >
                              <CardContent style={{ alignItems: "center" }}>
                                <CardMedia
                                  image={item.image || headerImage}
                                  style={{
                                    maxHeight: 130,
                                    maxWidth: 130,
                                    minWidth: 130,
                                    minHeight: 130,
                                  }}
                                />
                                <Typography
                                  variant="body1"
                                  align="justify"
                                  style={{
                                    color: "grey",
                                    fontFamily: "Roboto",
                                    marginTop: 10,
                                    fontSize: 15,
                                    marginleft: 10,
                                    marginRight: 5,
                                  }}
                                >
                                  {/* <MusicNoteTwoToneIcon /> */}
                                  {item.title}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                        :
                        <div className="navbar" style={{ height: "250px"}}>
                            <HorizontalScroll>
                              {playlist.map((item) => (
                                //console.log(item.image),
                                <Card
                                  key={item.id}
                                  style={{
                                    marginTop: 15,
                                    maxWidth: 160,
                                    minWidth: 160,
                                    maxHeight: 200,
                                    minHeight: 200,
                                    marginleft: 10,
                                    marginRight: 10,
                                  }}
                                  onClick={() =>
                                    window.location.replace(`/playlistPage/${item.id}/${window.location.pathname.split('/')[2]}`)
                                  }
                                >
                                  <CardContent style={{ alignItems: "center" }}>
                                    <CardMedia
                                      image={item.image || headerImage}
                                      style={{
                                        maxHeight: 130,
                                        maxWidth: 130,
                                        minWidth: 130,
                                        minHeight: 130,
                                      }}
                                    />
                                    <Typography
                                      variant="body1"
                                      align="justify"
                                      style={{
                                        color: "grey",
                                        fontFamily: "Roboto",
                                        marginTop: 10,
                                        fontSize: 15,
                                        marginleft: 10,
                                        marginRight: 5,
                                      }}
                                    >
                                      {/* <MusicNoteTwoToneIcon /> */}
                                      {item.title}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))}
                            </HorizontalScroll>
                          </div>

                        }
                                   
                        </div>
                        
                        <div className="bottombar" style={{ height: "250px"}}>
                            <HorizontalScroll>
                              {playlist.map((item) => (
                                //console.log(item.image),
                                <Card
                                  key={item.id}
                                  style={{
                                    marginTop: 15,
                                    maxWidth: 160,
                                    minWidth: 160,
                                    maxHeight: 200,
                                    minHeight: 200,
                                    marginleft: 10,
                                    marginRight: 10,
                                  }}
                                  onClick={() =>
                                    window.location.replace(`/playlistPage/${item.id}/${window.location.pathname.split('/')[2]}`)
                                  }
                                >
                                  <CardContent style={{ alignItems: "center" }}>
                                    <CardMedia
                                      image={item.image || headerImage}
                                      style={{
                                        maxHeight: 130,
                                        maxWidth: 130,
                                        minWidth: 130,
                                        minHeight: 130,
                                      }}
                                    />
                                    <Typography
                                      variant="body1"
                                      align="justify"
                                      style={{
                                        color: "grey",
                                        fontFamily: "Roboto",
                                        marginTop: 10,
                                        fontSize: 15,
                                        marginleft: 10,
                                        marginRight: 5,
                                      }}
                                    >
                                      {/* <MusicNoteTwoToneIcon /> */}
                                      {item.title}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))}
                            </HorizontalScroll>
                          </div>
                        </If>
                                                  :null
                                                }
                      </Paper>
                      </Grid>
                      <br />
                      <Grid item xs={12} sm={12} md={12} lg={9}>
                      {posts.length!==0?

                      <If condition={window.location.pathname.split('/')[2]===Cookie.get('userid')||profilepic.profile_status==="public"||followCheck===true}>

                      <h2 style={{ fontSize: 30, lineHeight: 0.1 ,fontFamily:'Open Sans'}}>Posts </h2>
                      <div className='navbar'>
                      <hr style={{minWidth:'135%'}}/>
                      </div>
                      <div className='bottombar'>
                      <hr style={{minWidth:'90%'}}/>
                      </div>
                      <div className="Profileposts" style={{marginBottom:70}}> 
          
                        {posts
                          .map((post) => (
                            <Post
                              logedinUser={Cookie.get("username")}
                              selecting={ChildHandler}
                              play={PlayHandler}
                              key={post.id}
                              title={post.caption}
                              id={post.id}
                              date={post.date.split("T")[0]}
                              image={post.playlist.image}
                              username={post.user.username}
                              profile_picture={post.user.profile_picture}
                              postId={post.id}
                              postUser={post.user.id}
                              action={handle}
                              // url={post.url}
                              // artist={post.artist}
                              // ids={post.ids}
                              // clicked={() => this.SelectedHandler(post.url, post.ids, post.name, post.image, post.artist)}
                            />
                          ))
                          }
                      </div>

                                
                      </If>
                      :null
                    }
                        </Grid>
                    </Grid>
                    <Grid xs={3} sm={3} md={3} lg={3}   > 
                    <Paper elevation={2} className="Topspotifymusicscroll" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed', marginTop:0,marginLeft:35,paddingLeft:0 , width: '25%', height: '100%'}} >
                        <AppBar
                          position="relative"
                          color="default"
                        >
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                          >
                            <Tab
                              style={{ fontSize: 11, minWidth: "80px" }}
                              label="Following"
                              {...a11yProps(0)}
                            />
                            <Tab
                              style={{ fontSize: 11, minWidth: "80px" }}
                              label="Followers"
                              {...a11yProps(1)}
                            />
                            <Tab
                              style={{ fontSize: 11, minWidth: "80px" }}
                              label="suggestions"
                              {...a11yProps(2)}
                            />
                          </Tabs>
                        </AppBar>
          <PerfectScrollbar>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          {Cookie.get('userid')===userid?
                           <Paper elevation={0} className={classes.paper5}>
                           {followin.length === 0 && (
                             <p style={{ textAlign: "center", fontFamily: "Roboto" }}>
                               Nothing to Show Right Now!
                             </p>
                           )}
                           {followin.map((item) => {
                             const isFollowing = checkIsFollowingOrNot(item.id);
                             const isPrivate = item.profile_status==="private";
                             return (
                               <Card
                                 key={item.id}
                                 style={{
                                   backgroundColor: "white",
                                   width:'105%',
                                   maxHeight: 60,
                                   minHeight: 60,
                                   marginLeft: -7,
                                   marginTop: 3,
                                 }}
                               >
                                 <CardContent className={classes.card}>
                                   <Typography
                                     variant="body1"
                                     align="justify"
                                     style={{
                                       fontFamily: "Roboto",
                                       marginTop: -5,
                                       fontSize: 12,
                                       marginLeft: 50,
                                     }}
                                     onClick={() =>
                                       window.location.replace(`/user/${item.id}`)
                                     }
                                   >
                                     {item.username}
                                   </Typography>
                                   <Typography
                                     variant="body1"
                                     align="justify"
                                     style={{
                                       fontFamily: "Roboto",
                                       fontSize: 11,
                                       color: "grey",
                                       marginLeft: 50,
                                     }}
                                   >
                                     {item.first_name}
                                     {item.last_name}
                                   </Typography>
         
                                   <Avatar
                                     src={item.profile_picture}
                                     style={{
                                       width: 48,
                                       height: 48,
                                       bottom: 38,
                                       left: -5,
                                     }}
                                   />
                                 <If condition={Cookie.get('username')!==item.username}>
                                   <Button
                                     style={{
                                       bottom: 80,
                                       left: 195,
                                       fontSize: 11,
                                     }}
                                     //variant="contained"
                                     size="small"
                                     className={classes.margin}
                                     onClick={
                                       isFollowing
                                         ? async () => {
                                             await axios
                                               .delete(
                                                 `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
         
                                                 {
                                                   headers: {
                                                     Authorization: "Token " + token,
                                                   },
                                                 }
                                               )
         
                                               .then((res) => {
                                                 axios
                                                   .get(
                                                     "http://localhost:8000/api/v1/accounts/users/",
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setUsers(res.data);
                                                   })
                                                   .catch((error) => {});
                                                 // const getFollowing = () => {
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setfollowingLentgh(res.data.length);
                                                     setFollowin(res.data);
                                                   });
                                                 // getFollowing();
                                                 // };
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setState({
                                                       followers: res.data.follower_num,
                                                       following: res.data.following_num,
                                                       imagee: res.data.profile_picture,
                                                       username: res.data.username,
                                                       firstname: res.data.first_name,
                                                     });
                                                   })
         
                                                   .catch((error) => {});
                                               })
         
                                               .catch((error) => {});
                                           }
                                         : async () => {
                                             await axios
                                               .patch(
                                                 `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                                 follow.id,
                                                 {
                                                   headers: {
                                                     Authorization: "Token " + token,
                                                   },
                                                 }
                                               )
                                               .then((res) => {
                                                 axios
                                                   .get(
                                                     "http://localhost:8000/api/v1/accounts/users/",
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setUsers(res.data);
                                                   })
                                                   .catch((error) => {});
                                                 // const getFollowing = () => {
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/following/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setfollowingLentgh(res.data.length);
                                                     setFollowin(res.data);
                                                   })
                                                   .catch((error) => {});
                                                 // };
                                                 axios
                                                   .get(
                                                     `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                     {
                                                       headers: {
                                                         "Content-Type":
                                                           "multipart/form-data",
                                                         Authorization: `Token ${Cookie.get(
                                                           "token"
                                                         )}`,
                                                       },
                                                     }
                                                   )
                                                   .then((res) => {
                                                     setState({
                                                       followers: res.data.follower_num,
                                                       following: res.data.following_num,
                                                       imagee: res.data.profile_picture,
                                                       username: res.data.username,
                                                       firstname: res.data.first_name,
                                                     });
                                                   })
         
                                                   .catch((error) => {});
                                               })
                                               .catch((error) => {});
                                           }
                                     }
                                   >
                                      {isFollowing ? "unFollow" : isPrivate ? "Request" :"Follow"}
                                   </Button>
                                   </If>
                                 </CardContent>
                               </Card>
                             );
                           })}
                         </Paper>
                         : <Paper elevation={0} className={classes.paper5}>
                         {following.length === 0 && (
                           <p style={{ textAlign: "center", fontFamily: "Roboto" }}>
                             Nothing to Show Right Now!
                           </p>
                         )}
                         {following.map((item) => {
                           const isFollowing = checkIsFollowingOrNot(item.id);
                           const isPrivate = item.profile_status==="private";
                           return (
                             <Card
                               key={item.id}
                               style={{
                                 backgroundColor: "white",
                                 width:'105%',
                                 maxHeight: 60,
                                 minHeight: 60,
                                 marginLeft: -7,
                                 marginTop: 3,
                               }}
                             >
                               <CardContent className={classes.card}>
                                 <Typography
                                   variant="body1"
                                   align="justify"
                                   style={{
                                     fontFamily: "Roboto",
                                     marginTop: -5,
                                     fontSize: 12,
                                     marginLeft: 50,
                                   }}
                                   onClick={() =>
                                     window.location.replace(`/user/${item.id}`)
                                   }
                                 >
                                   {item.username}
                                 </Typography>
                                 <Typography
                                   variant="body1"
                                   align="justify"
                                   style={{
                                     fontFamily: "Roboto",
                                     fontSize: 11,
                                     color: "grey",
                                     marginLeft: 50,
                                   }}
                                 >
                                   {item.first_name}
                                   {item.last_name}
                                 </Typography>
       
                                 <Avatar
                                   src={item.profile_picture}
                                   style={{
                                     width: 48,
                                     height: 48,
                                     bottom: 38,
                                     left: -5,
                                   }}
                                 />
                               <If condition={Cookie.get('username')!==item.username}>
                                 <Button
                                   style={{
                                     bottom: 80,
                                     left: 165,
                                     fontSize: 11,
                                   }}
                                   //variant="contained"
                                   size="small"
                                   className={classes.margin}
                                   onClick={
                                     isFollowing
                                       ? async () => {
                                           await axios
                                             .delete(
                                               `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
       
                                               {
                                                 headers: {
                                                   Authorization: "Token " + token,
                                                 },
                                               }
                                             )
       
                                             .then((res) => {
                                               axios
                                                 .get(
                                                   "http://localhost:8000/api/v1/accounts/users/",
                                                   {
                                                     headers: {
                                                       "Content-Type":
                                                         "multipart/form-data",
                                                       Authorization: `Token ${Cookie.get(
                                                         "token"
                                                       )}`,
                                                     },
                                                   }
                                                 )
                                                 .then((res) => {
                                                   setUsers(res.data);
                                                 })
                                                 .catch((error) => {});
                                               // const getFollowing = () => {
                                               axios
                                                 .get(
                                                   `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                   {
                                                     headers: {
                                                       "Content-Type":
                                                         "multipart/form-data",
                                                       Authorization: `Token ${Cookie.get(
                                                         "token"
                                                       )}`,
                                                     },
                                                   }
                                                 )
                                                 .then((res) => {
                                                   setfollowingLentgh(res.data.length);
                                                   setFollowin(res.data);
                                                 });
                                               // getFollowing();
                                               // };
                                               axios
                                                 .get(
                                                   `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                   {
                                                     headers: {
                                                       "Content-Type":
                                                         "multipart/form-data",
                                                       Authorization: `Token ${Cookie.get(
                                                         "token"
                                                       )}`,
                                                     },
                                                   }
                                                 )
                                                 .then((res) => {
                                                   setState({
                                                     followers: res.data.follower_num,
                                                     following: res.data.following_num,
                                                     imagee: res.data.profile_picture,
                                                     username: res.data.username,
                                                     firstname: res.data.first_name,
                                                   });
                                                 })
       
                                                 .catch((error) => {});
                                             })
       
                                             .catch((error) => {});
                                         }
                                       : async () => {
                                           await axios
                                             .patch(
                                               `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                               follow.id,
                                               {
                                                 headers: {
                                                   Authorization: "Token " + token,
                                                 },
                                               }
                                             )
                                             .then((res) => {
                                               axios
                                                 .get(
                                                   "http://localhost:8000/api/v1/accounts/users/",
                                                   {
                                                     headers: {
                                                       "Content-Type":
                                                         "multipart/form-data",
                                                       Authorization: `Token ${Cookie.get(
                                                         "token"
                                                       )}`,
                                                     },
                                                   }
                                                 )
                                                 .then((res) => {
                                                   setUsers(res.data);
                                                 })
                                                 .catch((error) => {});
                                               // const getFollowing = () => {
                                               axios
                                                 .get(
                                                   `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                   {
                                                     headers: {
                                                       "Content-Type":
                                                         "multipart/form-data",
                                                       Authorization: `Token ${Cookie.get(
                                                         "token"
                                                       )}`,
                                                     },
                                                   }
                                                 )
                                                 .then((res) => {
                                                   setfollowingLentgh(res.data.length);
                                                   setFollowin(res.data);
                                                 })
                                                 .catch((error) => {});
                                               // };
                                               axios
                                                 .get(
                                                   `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                   {
                                                     headers: {
                                                       "Content-Type":
                                                         "multipart/form-data",
                                                       Authorization: `Token ${Cookie.get(
                                                         "token"
                                                       )}`,
                                                     },
                                                   }
                                                 )
                                                 .then((res) => {
                                                   setState({
                                                     followers: res.data.follower_num,
                                                     following: res.data.following_num,
                                                     imagee: res.data.profile_picture,
                                                     username: res.data.username,
                                                     firstname: res.data.first_name,
                                                   });
                                                 })
       
                                                 .catch((error) => {});
                                             })
                                             .catch((error) => {});
                                         }
                                   }
                                 >
                                    {isFollowing ? "unFollow" : isPrivate ? "Request" :"Follow"}
                                 </Button>
                                 </If>
                               </CardContent>
                             </Card>
                           );
                         })}
                       </Paper>

                          }
                         
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                          <Paper elevation={0} className={classes.paper5}>
                            <PerfectScrollbar>
                            {followers.length === 0 && (
                              <p style={{ textAlign: "center", fontFamily: "Roboto" }}>
                                Nothing to Show Right Now!
                              </p>
                            )}
                            {followers.map((item) => {
                              const isFollowing = checkIsFollowingOrNot(item.id);
                              const isPrivate = item.profile_status==="private";
                              return (
                                <Card
                                  key={item.id}
                                  style={{
                                    backgroundColor: "white",
                                    width:'105%',
                                    maxHeight: 60,
                                    minHeight: 60,
                                    marginLeft: -7,
                                    marginTop: 3,
                                  }}
                                >
                                  <CardContent className={classes.card}>
                                    <Typography
                                      variant="body1"
                                      align="justify"
                                      style={{
                                        fontFamily: "Roboto",
                                        marginTop: -5,
                                        fontSize: 12,
                                        marginLeft: 50,
                                      }}
                                      onClick={() =>
                                        window.location.replace(`/user/${item.id}`)
                                      }
                                    >
                                      {item.username}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      align="justify"
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: 11,
                                        color: "grey",
                                        marginLeft: 50,
                                      }}
                                    >
                                      {item.first_name}
                                      {item.last_name}
                                    </Typography>
          
                                    <Avatar
                                      src={item.profile_picture}
                                      style={{
                                        width: 48,
                                        height: 48,
                                        bottom: 38,
                                        left: -5,
                                      }}
                                    />
                                  <If condition={Cookie.get('username')!==item.username}>
                                    <Button
                                      style={{
                                        bottom: 80,
                                        left: 195,
                                        fontSize: 11,
                                      }}
                                      //variant="contained"
                                      size="small"
                                      className={classes.margin}
                                      onClick={
                                        isFollowing
                                          ? async () => {
                                              await axios
                                                .delete(
                                                  `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
          
                                                  {
                                                    headers: {
                                                      Authorization: "Token " + token,
                                                    },
                                                  }
                                                )
          
                                                .then((res) => {
                                                  axios
                                                    .get(
                                                      "http://localhost:8000/api/v1/accounts/users/",
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setUsers(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // const getFollowing = () => {
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setfollowingLentgh(res.data.length);
                                                      setFollowin(res.data);
                                                    });
                                                  // getFollowing();
                                                  // };
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setState({
                                                        followers: res.data.follower_num,
                                                        following: res.data.following_num,
                                                        imagee: res.data.profile_picture,
                                                        username: res.data.username,
                                                        firstname: res.data.first_name,
                                                      });
                                                    })
          
                                                    .catch((error) => {});
                                                })
          
                                                .catch((error) => {});
                                            }
                                          : async () => {
                                              await axios
                                                .patch(
                                                  `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                                  follow.id,
                                                  {
                                                    headers: {
                                                      Authorization: "Token " + token,
                                                    },
                                                  }
                                                )
                                                .then((res) => {
                                                  axios
                                                    .get(
                                                      "http://localhost:8000/api/v1/accounts/users/",
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setUsers(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // const getFollowing = () => {
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setfollowingLentgh(res.data.length);
                                                      setFollowin(res.data);
                                                    })
                                                    .catch((error) => {});
                                                  // };
                                                  axios
                                                    .get(
                                                      `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                      {
                                                        headers: {
                                                          "Content-Type":
                                                            "multipart/form-data",
                                                          Authorization: `Token ${Cookie.get(
                                                            "token"
                                                          )}`,
                                                        },
                                                      }
                                                    )
                                                    .then((res) => {
                                                      setState({
                                                        followers: res.data.follower_num,
                                                        following: res.data.following_num,
                                                        imagee: res.data.profile_picture,
                                                        username: res.data.username,
                                                        firstname: res.data.first_name,
                                                      });
                                                    })
          
                                                    .catch((error) => {});
                                                })
                                                .catch((error) => {});
                                            }
                                      }
                                    >
                                       {isFollowing ? "unFollow" : isPrivate ? "Request" :"Follow"}
                                    </Button>
                                    </If>
                                  </CardContent>
                                </Card>
                              );
                            })}
                            </PerfectScrollbar>
                          </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}>
                          <Paper elevation={0} className={classes.paper5}>
                            <Paper elevation={0} className={classes.paper4}>
                              <InputBase
                                className={classes.input}
                                placeholder="Search for users"
                                style={{ fontSize: 13, marginLeft: "-10px" }}
                                //inputProps={{ "aria-label": "Search for users" }}
                                type="text"
                                value={uuuser.user}
                                onChange={(event) =>
                                  setUser({ user: event.target.value })
                                }
                              />
                              <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={handleClickOpenn}
                              >
                                <SearchIcon />
                              </IconButton>
                              <Dialog
                                        style={{zIndex:100000000}}

                                open={openn}
                                onClose={handleClosee}
                                PaperComponent={PaperComponent}
                                aria-labelledby="draggable-dialog-title"
                              >
                                <DialogTitle
                                  style={{ cursor: "move" }}
                                  id="draggable-dialog-title"
                                >
                                  Search for {uuuser.user}
                                </DialogTitle>
                                <DialogContent>
                                  {search.length === 0 && (
                                    <p
                                      style={{
                                        textAlign: "center",
                                        fontFamily: "Roboto",
                                      }}
                                    >
                                      Nothing to Show !
                                    </p>
                                  )}
                                  {search.map((item) => {
                                    const isFollowing = checkIsFollowingOrNot(item.id);
                                    const isPrivate = item.profile_status==="private";
                                    return (
                                      <Card
                                        key={item.id}
                                        style={{
                                          backgroundColor: "white",
                                          maxWidth: 260,
                                          minWidth: 260,
                                          maxHeight: 60,
                                          minHeight: 60,
                                          marginLeft: -7,
                                          marginTop: 3,
                                        }}
                                      >
                                        <CardContent className={classes.card}>
                                          <Typography
                                            variant="body1"
                                            align="justify"
                                            style={{
                                              fontFamily: "Roboto",
                                              marginTop: -5,
                                              fontSize: 12,
          
                                              marginLeft: 50,
                                            }}
                                            onClick={() =>
                                              window.location.replace(`/user/${item.id}`)
                                            }
                                          >
                                            {item.username}
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            align="justify"
                                            style={{
                                              fontFamily: "Roboto",
                                              fontSize: 11,
                                              color: "grey",
                                              marginLeft: 50,
                                            }}
                                          >
                                            {item.first_name}
                                            {item.last_name}
                                          </Typography>
                                          <Avatar
                                            src={item.profile_picture}
                                            style={{
                                              width: 48,
                                              height: 48,
                                              bottom: 38,
                                              left: -5,
                                            }}
                                          />
          
                                          <Button
                                            style={{
                                              bottom: 80,
                                              left: 165,
                                              fontSize: 11,
                                            }}
                                            //variant="contained"
                                            size="small"
                                            className={classes.margin}
                                            onClick={
                                              isFollowing
                                                ? async () => {
                                                    await axios
                                                      .delete(
                                                        `http://localhost:8000/api/v1/accounts/users/unfollow/${item.id}`,
          
                                                        {
                                                          headers: {
                                                            Authorization:
                                                              "Token " + token,
                                                          },
                                                        }
                                                      )
          
                                                      .then((res) => {
                                                        axios
                                                          .get(
                                                            "http://localhost:8000/api/v1/accounts/users/",
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setUsers(res.data);
                                                          })
                                                          .catch((error) => {});
                                                        // const getFollowing = () => {
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setfollowingLentgh(
                                                              res.data.length
                                                            );
                                                            setFollowin(res.data);
                                                          });
                                                        // getFollowing();
                                                        // };
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setState({
                                                              followers:
                                                                res.data.follower_num,
                                                              following:
                                                                res.data.following_num,
                                                              imagee:
                                                                res.data.profile_picture,
                                                              username: res.data.username,
                                                              firstname:
                                                                res.data.first_name,
                                                            });
                                                          })
          
                                                          .catch((error) => {});
                                                      })
          
                                                      .catch((error) => {});
                                                  }
                                                : async () => {
                                                    await axios
                                                      .patch(
                                                        `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                                        follow.id,
                                                        {
                                                          headers: {
                                                            Authorization:
                                                              "Token " + token,
                                                          },
                                                        }
                                                      )
                                                      .then((res) => {
                                                        axios
                                                          .get(
                                                            "http://localhost:8000/api/v1/accounts/users/",
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setUsers(res.data);
                                                          })
                                                          .catch((error) => {});
                                                        // const getFollowing = () => {
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setfollowingLentgh(
                                                              res.data.length
                                                            );
                                                            setFollowin(res.data);
                                                          })
                                                          .catch((error) => {});
                                                        // };
                                                        axios
                                                          .get(
                                                            `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                            {
                                                              headers: {
                                                                "Content-Type":
                                                                  "multipart/form-data",
                                                                Authorization: `Token ${Cookie.get(
                                                                  "token"
                                                                )}`,
                                                              },
                                                            }
                                                          )
                                                          .then((res) => {
                                                            setState({
                                                              followers:
                                                                res.data.follower_num,
                                                              following:
                                                                res.data.following_num,
                                                              imagee:
                                                                res.data.profile_picture,
                                                              username: res.data.username,
                                                              firstname:
                                                                res.data.first_name,
                                                            });
                                                          })
          
                                                          .catch((error) => {});
                                                      })
                                                      .catch((error) => {});
                                                  }
                                            }
                                          >
                                            {isFollowing ? "unFollow" : isPrivate ? "Request" :"Follow"}
                                          </Button>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClosee} color="primary">
                                    ok
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              <Divider
                                className={classes.divider}
                                orientation="vertical"
                              />
                              {users.length === 0 && (
                                <p style={{ textAlign: "center", fontFamily: "Roboto" }}>
                                  Nothing to Show Right Now!
                                </p>
                              )}
                              {users.map((item) => 
                                 {
                                  const isPrivate = item.profile_status==="private";
                                  return (
                                <Card
                                  key={item.id}
                                  style={{
                                    backgroundColor: "white",
                                    width:'105%',
                                    maxHeight: 60,
                                    minHeight: 60,
                                    marginLeft: -7,
                                    marginTop: 3,
                                  }}
                                >
                                  <CardContent className={classes.card}>
                                    <Typography
                                      variant="body1"
                                      align="justify"
                                      style={{
                                        fontFamily: "Roboto",
                                        marginTop: -5,
                                        fontSize: 12,
          
                                        marginLeft: 50,
                                      }}
                                      onClick={() =>
                                        window.location.replace(`/user/${item.id}`)
                                      }
                                    >
                                      {item.username}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      align="justify"
                                      style={{
                                        fontFamily: "Roboto",
                                        fontSize: 11,
                                        color: "grey",
                                        marginLeft: 50,
                                      }}
                                    >
                                      {item.first_name}
                                      {item.last_name}
                                    </Typography>
                                    <Avatar
                                      src={item.profile_picture}
                                      style={{
                                        width: 48,
                                        height: 48,
                                        bottom: 38,
                                        left: -5,
                                      }}
                                    />
                                    
                                    <Button
                                      style={{
                                        bottom: 80,
                                        left: 195,
                                        fontSize: 11,
                                      }}
                                      //variant="contained"
                                      size="small"
                                      className={classes.margin}
                                      onClick={async () => {
                                        await axios
                                          .patch(
                                            `http://localhost:8000/api/v1/accounts/users/follow/${item.id}`,
                                            follow.id,
                                            {
                                              headers: {
                                                Authorization: "Token " + token,
                                              },
                                            }
                                          )
                                          .then((res) => {
                                            axios
                                              .get(
                                                "http://localhost:8000/api/v1/accounts/users/",
                                                {
                                                  headers: {
                                                    "Content-Type": "multipart/form-data",
                                                    Authorization: `Token ${Cookie.get(
                                                      "token"
                                                    )}`,
                                                  },
                                                }
                                              )
                                              .then((res) => {
                                                setUsers(res.data);
                                              })
                                              .catch((error) => {});
                                            // const getFollowing = () => {
                                            axios
                                              .get(
                                                `http://localhost:8000/api/v1/accounts/users/following/${Cookie.get('userid')}`,
                                                {
                                                  headers: {
                                                    "Content-Type": "multipart/form-data",
                                                    Authorization: `Token ${Cookie.get(
                                                      "token"
                                                    )}`,
                                                  },
                                                }
                                              )
                                              .then((res) => {
                                                setfollowingLentgh(res.data.length);
                                                setFollowin(res.data);
                                              })
                                              .catch((error) => {});
                                            // };
                                            axios
                                              .get(
                                                `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
                                                {
                                                  headers: {
                                                    "Content-Type": "multipart/form-data",
                                                    Authorization: `Token ${Cookie.get(
                                                      "token"
                                                    )}`,
                                                  },
                                                }
                                              )
                                              .then((res) => {
                                                setState({
                                                  followers: res.data.follower_num,
                                                  following: res.data.following_num,
                                                  imagee: res.data.profile_picture,
                                                  username: res.data.username,
                                                  firstname: res.data.first_name,
                                                });
                                              })
          
                                              .catch((error) => {});
                                          })
                                          .catch((error) => {});
                                      }}
                                    >
                                      {isPrivate ? "Request" : "Follow"}
                                    </Button>
                                  </CardContent>
                                </Card>
                              );
                              })}
                            </Paper>
                          </Paper>
                        </TabPanel>
                        </PerfectScrollbar>
                      </Paper>
                      <Grid item xs={12} sm={12} lg={12}>
                        <div>
                          {playHandler.selectedUrlX ? (
                            <div className="postPlayer">
                              {playHandler.SpotifyOrSoundcloud === true ? (
                                <iframe
                                  width="80%"
                                  height="300"
                                  scrolling="no"
                                  frameborder="no"
                                  allow="autoplay"
                                  src={
                                    "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/" +
                                    playHandler.selectedUrlX +
                                    "&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                                  }
                                ></iframe>
                              ) : (
                                <iframe
                                  src={
                                    "https://open.spotify.com/embed/" +
                                    playHandler.selectedUrlX 
                                  }
                                  width="80%"
                                  height="300"
                                  frameborder="0"
                                  allowtransparency="true"
                                  allow="encrypted-media"
                                />
                              )}
                            </div>
                          ) : null}
                        </div>
                      </Grid>
                  
                      <Grid item xs={12} sm={12} lg={12}>
                      <Dialog
                          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                          open={openAdd}
                          onClose={handleCloseAdd}
                          aria-labelledby="scroll-dialog-title"
                          aria-describedby="scroll-dialog-description">
                          <DialogTitle id="scroll-dialog-title">           
                          <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
                          adding  "{childHandler.selectedname}" to:</Typography>
                          </DialogTitle>
                          <DialogContent style={{marginBottom:20}} >
                          <AddPlaylist
                           Name={childHandler.selectedname}
                           Url={childHandler.selectedUrl}
                           SpotifyOrSoundcloud={childHandler.SpotifyOrSoundcloud}
                           Image={childHandler.selectedImage}
                           artist={childHandler.selecteartist}
                          togglePopUpDelete={handleClickOpenAdd}
                          onSuccessFullySave={() => {
                            handleCloseAdd()}}
                        />
                          
                          </DialogContent>
                        </Dialog>
                        <Dialog
                style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={opennnnn}
                onClose={handleCloseeeee}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                  <div style={{backgroundColor:'#f0f0f027'}}>
                <DialogTitle id="scroll-dialog-title">
        
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left',display:'flex',flexWrap:'nowrap'}}>
                <Avatar
  src={profilepic.imagee}
  style={{
    width: 40,
    height: 40,
    marginRight:5
  }}
/>   
                {state.username}</Typography>
                </DialogTitle>
                
                <DialogContent >
                  {storyUrl!==undefined?
                  <div>
                     {storyUrl.includes('tracks') ?
                      <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'+ storyUrl +'&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>     
                      : <iframe  src={'https://open.spotify.com/embed/' + storyUrl }
                      width="100%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media" />
                                  }
                  </div>
                  :<div>
                    This user doesn't share any story
                  </div>
                  }
               
                </DialogContent>
                </div>
              </Dialog>
                        {/* {childHandler.showPlayer ? (
                          <AddPlaylist
                            Name={childHandler.selectedname}
                            Url={childHandler.selectedUrl}
                            SpotifyOrSoundcloud={childHandler.SpotifyOrSoundcloud}
                            Image={childHandler.selectedImage}
                            artist={childHandler.selecteartist}
                            togglePopUpDelete={togglePopUpAdd}
                          />
                        ) : null} */}
                      </Grid>
                      
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
          <If condition={window.location.pathname.split('/')[2]!==Cookie.get('userid')&&profilepic.profile_status!=="public"&&followCheck===false}>
            <div className="bottombar">
          <Typography
          variant="body1"
          align="justify"
          style={{
          textAlign: "center",
          fontFamily: "Open Sans",
          fontSize: 15,
          }}
          >                This Account is Private
          Follow to see their photos and videos.
          </Typography>
          </div>
          <div className="navbar">
          <Typography
          variant="body1"
          align="justify"
          style={{
            textAlign:'center',
            marginLeft:-200,
          fontFamily: "Open Sans",
          fontSize: 15,
          }}
          >                This Account is Private
          follow to see their posts and playlists.
          </Typography>
          </div>
            </If>
            </Grid>
          
                  {/* </Grid> */}
                {/* // </div> */}
                      </Grid>
                }   
   
    </div>
  );
}
export default withRouter(User);
