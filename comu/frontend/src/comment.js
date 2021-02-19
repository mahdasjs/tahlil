import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import soundcloudlogo from './soundcloud.png';
import spotifylogo from './spotifylogo.png';
import Avatar from "@material-ui/core/Avatar";
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/Delete';
import Cookie from 'js-cookie';
import axios from 'axios'
import { If } from 'rc-if-else';
const theme = createMuiTheme({
    typography: {
      body1: {
        fontFamily:(     'Open Sans'),
        fontWeight: 500,
      },
    },
  });
  class post extends React.Component {  
    constructor(props){
      super(props);
      this.state={
        logo:null,
        userid:Cookie.get("userid"),
        username:Cookie.get("username"),

      }
    }
    componentDidMount() {
      console.log(this.props.username,this.state.username)
      if(this.props.ids===true){
        this.setState({logo:soundcloudlogo})
      }
      else{
        this.setState({logo:spotifylogo})
      }
    }
    del= () => {
      this.props.action();
      axios({
          method:'delete',
          url: `http://localhost:8000/api/v1/posts/comment/${this.props.id}`,
          headers: { 'Authorization':`Token ${Cookie.get('token')}`},
      })
  }
    render(){
      return(
       <ThemeProvider theme={theme}>
           {/* <Card
                style={{backgroundColor:"rgba(0, 0, 0, 0.01)" ,margin:5}}>   */}
                  <Grid container>
                    <Grid style={{display:'flex',flexWrap:'nowrap',marginTop:5}} item xs={11} sm={11} md={11} lg={10}>
                <Avatar
                      style={{
                        width: 30,
                        height: 30
                      }}
                                      src={this.props.avatar}
              ></Avatar>
          <Typography variant='body1' align='left' style={{marginLeft:5,marginTop:0,fontSize:18,fontFamily:'Open Sans'}} >
          {this.props.username}<span style={{ fontSize:13}}> {this.props.text}</span>
          </Typography>
          </Grid>
          <If condition={JSON.stringify (this.props.postUser)===this.state.userid||this.props.postUser===this.state.username||this.props.username===this.state.username}>
          <Grid xs={1} sm={1} ms={1} lg={2}>
            <IconButton onClick={this.del}>
            <MoreVertIcon />
            </IconButton>
          </Grid>
          </If>
        
          </Grid>

          <Divider style={{marginTop:10,marginBottom:10}}/>
          {/* </Card> */}
  </ThemeProvider>
);
      }
    }
export default post;