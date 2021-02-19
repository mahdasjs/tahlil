import React, { Component } from "react";
import "./style.css";
import Welcome from "./welcomepage";
import {
  faHome,
  faMusic,
  faPlus,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { black } from "material-ui/styles/colors";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import playlist from "./playlist";
import homepage from "./homepage";
import playlistPage from "./playlistPage";
import Search from "./search";
import User from "./Profile/User";
import Edit from "./Profile/edit";
import axios from 'axios';
import Cookie from 'js-cookie'
import Post from "./post";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import USerIcon from '@material-ui/icons/SupervisedUserCircle';
import PlaylistIcon from '@material-ui/icons/List';
import {If} from 'rc-if-else'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Avatar from "@material-ui/core/Avatar";
import Logout from '@material-ui/icons/ExitToApp';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Whole from './wholeplaylists'
const theme = createMuiTheme({
  typography: {
    body1: {
      fontFamily:( "opensans"),
      fontWeight: 500,
    },
  },
});
const drawerWidth = 240;

const styles = theme => ({
  root: {
    fontFamily:'Open Sans',
    display: 'flex',
  },
  appBar: {
    fontFamily:'Open Sans',
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    fontFamily:'Open Sans',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    fontFamily:'Open Sans',
    width: drawerWidth,

  },
  toolbar: theme.mixins.toolbar,
  content: {
    fontFamily:'Open Sans',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class PersistentDrawerLeft extends React.Component {
  constructor(props){
      super(props)
      this.state={
        id:null,
        open: true,
        expanded:false,
        username:null,
        userprofile:null
      }
    }
    handleClick=()=> {
      Cookie.remove('token');
      Cookie.remove('userid')
      Cookie.remove('url')
      Cookie.remove('username')
  
    }
  
    componentDidMount(){
      axios({
        method: 'get',
        url:`http://localhost:8000/api/v1/accounts/users/userprofile/${Cookie.get('userid')}`,
        headers: { 'Authorization': `Token ${Cookie.get('token')}` },
    })
        .then(response => {
          this.setState({       userprofile: response.data.user_profile.profile_picture,
            username: response.data.username,})
        })
      axios({
        method: 'get',
        url: `http://localhost:8000/api/v1/playlist/${Cookie.get('userid')}`,
        headers: { 'Authorization': `Token ${Cookie.get('token')}` },
    })
        .then(response => {
          this.setState({id:response.data.id})
        })
    }
    handleChange = ()=> {
      this.setState({expanded:!this.state.expanded});
    };
    render(){
      const { classes, theme } = this.props;
      const { open } = this.state;
      return(

        <Router forceRefresh={true}
        >
          <Route render={({ location, history }) => (
              <React.Fragment>
                   <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography  align='center' style={{fontFamily:'Open Sans',fontSize:30,marginTop:4,marginBottom:8}}>
              COMU
            </Typography>
          </div>
          <List>
              <ListItem style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} button key={'Homepage'} component={Link} to={'/homepage'}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Homepage
                            </Typography>              </ListItem>
              <ListItem button key={'Profile'} style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} component={Link} to={'/user/'+Cookie.get('userid')} >
                <ListItemIcon>
                <Avatar
                                  style={{width:30,height:30}}

                  src={this.state.userprofile}
                   aria-label="recipe">
                  </Avatar>           </ListItemIcon>
                <ListItemText style={{fontFamily:'Open Sans'}} primary={'Profile'}  />
              </ListItem>
        <ListItem button key={ 'Playlists'} style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}}  component={Link} to={`/playlistPage `}>
                <ListItemIcon>
                    <PlaylistIcon />
                </ListItemIcon>
                <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            My playlist
                            </Typography>              </ListItem>
      <ListItem button key={ 'Create playlist'}  style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} component={Link} to={'/Createplaylist'}>
        <ListItemIcon>
            <AddIcon />
        </ListItemIcon>
        <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Create playlist
                            </Typography>
      </ListItem>       

              <ListItem button key={ 'logout'} style={{boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `}} onClick={this.handleClick}  component={Link} to={'/'}>
        <ListItemIcon>
            <Logout />
        </ListItemIcon>
        <Typography
                            variant="body1"
                            align="justify"
                            style={{
                              fontFamily: "Open Sans",
                            }}
                          >
                            Logout
                            </Typography>      </ListItem>
          </List>
          
        </Drawer>
                  <Switch >
                  <Route  path="/homepage" exact component={homepage} />
                   <Route path="/homepage/:username/:id" exact component={homepage} />
                    <Route path="/createplaylist" component={playlist} />
                    <Route path="/" exact component={Welcome} />
                    <Route path="/user"  component={User}/>
                    <Route path="/user/:username/:id"  component={homepage}/>
                    <Route path="/playlistPage/:id/:username"  component={playlistPage} />
                    <Route path="/playlistPage"  component={Whole} />
                    <Route path="/search" exact component={Search}/>
                    <Route path="/edit" exact component={Edit}/>
                  </Switch>
                </React.Fragment>
            )}
          />
      </Router>

    );
  }
}
export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
