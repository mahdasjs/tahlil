import React from 'react';
import Play from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import headerImage from './bokeh.jpg'
import Avatar from '@material-ui/core/Avatar';
import soundcloudlogo from './soundcloud.png';
import spotifylogo from './spotifylogo.png';
import {If} from 'rc-if-else';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
});

const theme = createMuiTheme({
    typography: {
      body1: {
        fontFamily:( "opensans"),
        fontWeight: 500,
      },
    },
  });
  class post extends React.Component { 
    constructor(props){
      super(props);
      this.state = {
        isHovering: false,
        logo:null,
        name:'null',
        anchorEl: null,

      }
      this.handleMouseHover = this.handleMouseHover.bind(this);
    }
    handlePopoverOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handlePopoverClose = () => {
      this.setState({ anchorEl: null });
    };
  

    handleMouseHover() {
      this.setState(this.toggleHoverState);
    }
    componentDidMount() {
      if(this.props.ids===true){
        this.setState({logo:soundcloudlogo})
        this.setState({name:"soundcloud"})
      }
      else{
        this.setState({logo:spotifylogo})
        this.setState({name:"spotify"})

      }
    }
    toggleHoverState(state) {
      return {
        isHovering: !state.isHovering,
      };
    } 
    render(){
      const { classes } = this.props;
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
  
      return(
        <ThemeProvider theme={theme}>


          <Card onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover} 
           style={{marginTop:15, maxWidth:160,minWidth:160,maxHeight:200,minHeight:200,marginleft:10,marginRight:10 }}
           >
              <Typography variant='body2' style={{display:'flex',position:'absolute',top:20, marginLeft:45, maxWidth:25,maxHeight:25,minWidth:25,minHeight:25}} >
                  {this.state.name} 
              </Typography>  
               <Avatar src={this.state.logo} 
                      style={{
                    width: 25,
                      height: 25,
                      marginLeft:15,
                      marginTop:5
                      }} />
              <CardMedia
                  image={this.props.image||headerImage}
                  style={{display:'flex',position:'absolute',top:50, marginLeft:15, maxHeight: 130, maxWidth: 130, minWidth: 130, minHeight: 130}}
              /> 
                            <If condition={this.props.title.length<16&&this.props.rsp!==true}>
                              
                <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:135, fontSize:14,fontFamily:'Open Sans'}} >
                  {this.props.title} 
                 
              </Typography>
              </If>
              <If condition={this.props.title.length<20&&this.props.rsp===true}>
                              
                              <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:145, fontSize:10,fontFamily:'Open Sans'}} >
                                {this.props.title} 
                               
                            </Typography>
                            </If>
              <If condition={this.props.title.length>15&&this.props.rsp!==true}>
                            <div>
                            <Tooltip title=  {this.props.title} >

                            <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:135, fontSize:14,fontFamily:'Open Sans'}} >
                            {this.props.title.substring(0,15)}... 
                 
              </Typography>
              </Tooltip>
          
      </div>

                 
              </If>
              <If condition={this.props.title.length>19&&this.props.rsp===true}>
                            <div>
                            <Tooltip title=  {this.props.title} >

                            <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:145, fontSize:10,fontFamily:'Open Sans'}} >
                            {this.props.title.substring(0,20)}... 
                 
              </Typography>
              </Tooltip>
          
      </div>

                 
              </If>
             
              <div className="bottombar">
              <Tooltip title="play">
              <Fab
              color="defualt"
              onClick={this.props.clicked} 
                               style={{display:'flex',position:'absolute',top:75, marginLeft:45, maxWidth:70,maxHeight:70,minWidth:70,minHeight:70}}
                          >
                              <Play style={{fontSize:40}}/>
                          </Fab>
                      </Tooltip>
              </div>
              {this.props.rsp===true?
              <Tooltip title="add music">
              <Fab color="defualt"
            onClick={this.props.selecting}
            style={{display:'flex',position:'absolute', marginTop:140,marginLeft:120, maxWidth:25,maxHeight:25,minWidth:25,minHeight:25}}>
                  <Add style={{fontSize:15}}/>
              </Fab>
            </Tooltip>
            :null
              

              }
              {
          this.state.isHovering &&
              <Tooltip title="play">
              <Fab
              color="defualt"
              onClick={this.props.clicked} 
                               style={{display:'flex',position:'absolute',top:75, marginLeft:45, maxWidth:70,maxHeight:70,minWidth:70,minHeight:70}}
                          >
                              <Play style={{fontSize:40}}/>
                          </Fab>
                      </Tooltip>
    }

             
          </Card>
        </ThemeProvider>
);
      }
    }
    export default withStyles(styles)(post);
