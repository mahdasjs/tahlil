import React from "react";
import {BrowserRouter as Router, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Grid, AppBar, Toolbar} from "@material-ui/core"
import "./style.css";
import SearchBar from './searchbar'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SearchICon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Music from '@material-ui/icons/MusicNote';
import Logout from '@material-ui/icons/ExitToApp';
import Cookie from 'js-cookie'

const theme = createMuiTheme({
  palette: {
    secondary: {
      dark: '#971243',
      main: '#d81b60',
      light: '#df487f',
    },
    primary: {
      dark: '#212c6f',
      main: '#303f9f',
      light: '#5965b2', 
    },
  },
}); 

const style = theme =>({

    row:{
      position:'fixed',
      display:'fixed',
      flexGrow:1
    },
    grow:{
      flexGrow:1
    },

    gorwprime:{
      flexGrow:1
    },
    container:{
      width:1400,
      margin:"auto"
    },
    AppBar:{
      backgroundSize:"cover"
    },
    logoutButton:{
      height:"40px",
      background: '#D81B60 ' ,
      margin:10,
      color:"#fff",
      borderRadius:"10px",
      padding:"0px 20px",

      '&:hover':{
        background: "#971243",
        boxShadow: "0px 2px 10px #888888"
      }}
});

class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state={
      data: "Default parent state"
    }
    this.childHandler = this.childHandler.bind(this)
  }
  childHandler(dataFromChild) {
    // log our state before and after we updated it
    this.setState({
        data: dataFromChild
    });
  }
  handleClick=()=> {
    Cookie.remove('token');
    Cookie.remove('userid')
    Cookie.remove('url')

  }

  render(){
    return(
      <ThemeProvider theme ={theme}>
        <div>
          <AppBar position="fixed" style={{zIndex:2010}} color = "primary" >
              <Toolbar>
              <Grid container>

                <Grid item xs={2} sm={2} md={3} lg={7}>
                <Typography variant='body1' align='left' className="comulogo" style={{top:15,fontSize:20,fontFamily:'Open Sans'}} >
                <Music  style={{color:"#fff"}}/>
                  COMU

          </Typography>              
            </Grid>
                <Grid item xs={7} sm={7} md={6} lg={3}>
                  <div className="searchbar">
                <SearchBar 
                searchinput={this.state.data}
                 action={this.childHandler} />
                </div>
                </Grid>
                <Router forceRefresh={true}>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                  <div  >
                <Link  to = {'/search?q=search_' + this.state.data} >
                <IconButton className="searchIcon" aria-label="settings" >
                <SearchICon  style={{color:"#fff"}}/>
                </IconButton>
                </Link>
                </div>
                </Grid>

                </Router>
                <Grid item xs={1} sm={1} md={1} lg={1}>
              <Link  to = "/">
              <div className="logout">
              <IconButton aria-label="settings"  onClick={this.handleClick} >
                <Logout  style={{marginRight:5,color:"#fff"}}
                
                />
              
                </IconButton>
                </div>
                
              </Link>
              </Grid>

              </Grid>

            </Toolbar>
        </AppBar>
      </div>
      </ThemeProvider>

    )
  }
}

export default withStyles(style)(Nav);
