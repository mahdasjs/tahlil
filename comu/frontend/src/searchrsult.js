import React from 'react';
import Play from '@material-ui/icons/PlayArrow';
import Add from '@material-ui/icons/Add';
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
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';

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
        fontFamily:( "Open Sans"),
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
      if(this.props.ids===false){
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
          onMouseLeave={this.handleMouseHover} style={{marginTop:15, maxWidth:160,minWidth:160,maxHeight:200,minHeight:200,marginleft:10,marginRight:10 }}>
              <Typography variant='body2' style={{display:'flex',position:'absolute',top:20, marginLeft:45, maxWidth:25,maxHeight:25,minWidth:25,minHeight:25,fontFamily:'Open Sans'}} >
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
                         <If condition={this.props.title.length<16}>
                              
                              <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:135, fontSize:14}} >
                                {this.props.title} 
                               
                            </Typography>
                            </If>
                            <If condition={this.props.title.length>15}>
                                          <div>
                                          <Tooltip title=  {this.props.title} >
                                          <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:135, fontSize:14}} >
                                          {this.props.title.substring(0,15)}... 
                               
                            </Typography>
                                            </Tooltip>
                                          {/* <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:135, fontSize:14}} 
              
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={this.handlePopoverOpen}
                        onMouseLeave={this.handlePopoverClose}
                      >
                           {this.props.title.substring(0,15)}... 
              
               </Typography>
                      <Popover
                        id="mouse-over-popover"
                        className={classes.popover}
                        classes={{
                          paper: classes.paper,
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        onClose={this.handlePopoverClose}
                        disableRestoreFocus
                      >
                        <Typography         style={{fontSize:12}}
              >             {this.props.title}</Typography>
                      </Popover> */}
                    </div>
              
                               
                            </If>
                           
                           
                            <div className="bottombar">
                           { this.props.addbool?
                            <div>
                            <Tooltip title="Play">
                            <Fab
                            color="defualt"
                            onClick={this.props.clicked} 
                              style={{display:'flex',position:'absolute',top:100, marginLeft:85, maxWidth:30,maxHeight:40,minWidth:40,minHeight:40}}
                                        >
                                            <Play style={{fontSize:20}}/>
                                        </Fab>
                                    </Tooltip>
                           <Tooltip title="Add">
                           <Fab
                           color="defualt"
                           onClick={this.props.action}
                              style={{display:'flex',position:'absolute',top:100, marginLeft:40, maxWidth:40,maxHeight:40,minWidth:40,minHeight:40}}
                                       >
                                           <Add style={{fontSize:20}}/>
                                       </Fab>
                                   </Tooltip>
                                                                      </div>

                                   :  <Tooltip title="play">
                                   <Fab
                                   color="defualt"
                                   onClick={this.props.clicked}
                                      style={{display:'flex',position:'absolute',top:90, marginLeft:60, maxWidth:40,maxHeight:40,minWidth:40,minHeight:40}}
                                               >
                                                   <Play style={{fontSize:20}}/>
                                               </Fab>
                                               </Tooltip>


                                   }
                                   </div>
             
              {
               this.state.isHovering &&
               <div>
                           { this.props.addbool?
                            <div>
                            <Tooltip title="Play">
                            <Fab
                            color="defualt"
                            onClick={this.props.clicked} 
                              style={{display:'flex',position:'absolute',top:100, marginLeft:85, maxWidth:30,maxHeight:40,minWidth:40,minHeight:40}}
                                        >
                                            <Play style={{fontSize:20}}/>
                                        </Fab>
                                    </Tooltip>
                           <Tooltip title="Add">
                           <Fab
                           color="defualt"
                           onClick={this.props.action}
                              style={{display:'flex',position:'absolute',top:100, marginLeft:40, maxWidth:40,maxHeight:40,minWidth:40,minHeight:40}}
                                       >
                                           <Add style={{fontSize:20}}/>
                                       </Fab>
                                   </Tooltip>
                                                                      </div>

                                   :  <Tooltip title="play">
                                   <Fab
                                   color="defualt"
                                   onClick={this.props.clicked}
                                      style={{display:'flex',position:'absolute',top:90, marginLeft:60, maxWidth:40,maxHeight:40,minWidth:40,minHeight:40}}
                                               >
                                                   <Play style={{fontSize:20}}/>
                                               </Fab>
                                               </Tooltip>


                                   }
                                   </div>
    }

          {this.props.followerbool?
                         <Typography variant='body1' align='left' 
                         style={{display:'flex',position:'absolute',marginLeft:15, marginTop:154, color:"rgba(0, 0, 0, 0.411)",fontSize:10}} 
                         >followers :               {this.props.artist}               </Typography>
               :               <div>       {this.props.artist?
                <Typography variant='body1' align='left' 
                style={{display:'flex',position:'absolute',marginLeft:15, marginTop:154, color:"rgba(0, 0, 0, 0.411)",fontSize:10}} 
                >            {this.props.artist.substring(0,17)}    </Typography>
                :null
                }            </div>


               }         
          </Card>
        </ThemeProvider>
);
      }
    }
    export default withStyles(styles)(post);
