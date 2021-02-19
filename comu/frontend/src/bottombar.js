import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import Myplaylists from '@material-ui/icons/PlaylistPlay';
import Usericon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Link } from "react-router-dom";
import playlist from "./playlist";
import homepage from "./homepage";
import playlistPage from "./playlistPage";
import {BrowserRouter as Router,Switch, Route,} from "react-router-dom";
import Search from './search'
import './homepage.css'
import User from './Profile/User';
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Cookie from "js-cookie";
import Whole from './wholeplaylists'
const useStyles = makeStyles({
  root: {
    display:'relative',
    overflowX:'hidden',
    overflow: 'hidden',
    zIndex:9999,
    position: 'fixed',
    bottom:" 0%",
    left:0,
    width: '100%',
    backgroundColor: '#303f9f',

  },
});

export default function LabelBottomNavigation() {
    
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  let [state, setState] = useState({
    username: null,
    profilepic:null,
    userid:Cookie.get("userid"),
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const handlePlayprofile = () => {
      axios
        .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${state.userid}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          setState({
            profilepic: res.data.user_profile.profile_picture,
            username: res.data.username,
          });
        })
        .catch((error) => {});
    };
    handlePlayprofile();
  }, []);
  return (
<Router>
<Route render={({ location, history }) => (
    <React.Fragment>
 <BottomNavigation  value={value}  onChange={handleChange}>
 <BottomNavigation value={value}                onChange={(selected) => {
                          const to = '/' + selected;
                          if (location.pathname !== to) {
                              history.push(to);
                          }
                      }}  className={classes.root} >

      <BottomNavigationAction label="Home" style={{color:'#fff'}} value="homepage" icon={<Home style={{color:"#fff"}}  />} component={Link} to={'/homepage'} />
      {/* <BottomNavigationAction label="Search" style={{color:"#fff"}} value="search" icon={<Searchicon style={{color:"#fff"}} />} component={Link} to={"/search"}/> */}
      <BottomNavigationAction label="Myplaylists" style={{color:"#fff"}} value="playlistPage" icon={<Myplaylists style={{color:"#fff"}} />}  component={Link} to={'/playlistPage'} />
      <BottomNavigationAction label={state.username} style={{color:"#fff"}} value="user" icon={             <Avatar
                  style={{width:30,height:30}}
                  src={state.profilepic}
                   aria-label="recipe">
                  </Avatar> } component={Link} to={'/user/'+Cookie.get('userid')}  />
    </BottomNavigation>
    </BottomNavigation>

        <Switch>
        <Route path="/search" exact component={Search}/>
          <Route path="/homepage" exact component={homepage} />
          <Route path="/createplaylist" component={playlist} />
          <Route path="/playlistPage" exact component={Whole} />
          <Route path="/user" exact component={User} />
          <Route path="/user/:id" exact component={User} />
          <Route path="/playlistPage/:id/:username" exact component={playlistPage}/>
          <Route path="/homepage/:username/:id" exact component={homepage}/>


        </Switch>
      </React.Fragment>
  )}
/>
</Router>
  );
}
