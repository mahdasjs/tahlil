import React from 'react';
import Add from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import soundcloudlogo from './soundcloud.png';
import spotifylogo from './spotifylogo.png';
import {If} from 'rc-if-else'
import { withStyles } from '@material-ui/core/styles';
import Play from '@material-ui/icons/PlayArrow';
import headerImage from './bokeh.jpg'

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
        fontFamily:( 'Open Sans'),
        fontWeight: 500,
      },
    },
  });
  class post extends React.Component {  
    constructor(props){
      super(props);
      this.state={
        logo:null,
        anchorEl: null,
        isHovering: false,

      }
      this.handleMouseHover = this.handleMouseHover.bind(this);

    }
    handlePopoverOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handlePopoverClose = () => {
      this.setState({ anchorEl: null });
    };
  
    componentDidMount() {
      if(this.props.ids===true){
        this.setState({logo:soundcloudlogo})
      }
      else{
        this.setState({logo:spotifylogo})
      }
    }
    toggleHoverState(state) {
      return {
        isHovering: !state.isHovering,
      };
    } 
    handleMouseHover() {
      this.setState(this.toggleHoverState);
    }
    render(){
          const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

      return(
       <ThemeProvider theme={theme}>
    <Card    onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
     style={{ display: 'flex',maxWidth:'90%',minWidth:'90%',maxHeight:90,minHeight:90,margin:5 }}>  
      <CardContent style={{display:'flex',flexWrap:'nowrap', alignContent: 'left', alignItems: 'left'}}>
        <CardMedia
            image={this.props.image||headerImage}
            style={{ maxHeight: 60, maxWidth: 60, minWidth: 60, minHeight: 60}}/>   
          <If condition={this.props.title.length<20}>
          <Typography variant='body1' align='left' style={{marginLeft:10,fontSize:12,fontFamily:'Open Sans'}} >
             {this.props.title} 
          </Typography>

          </If>
          <If condition={this.props.title.length>20}>
          <div>
          <Tooltip title=  {this.props.title} >
          <Typography variant='body1' align='left' style={{marginLeft:10,fontSize:12,fontFamily:'Open Sans'}} >
          {this.props.title.substring(0,15)}... 
          </Typography>
          </Tooltip>
          </div>

          </If>
          <Avatar src={this.state.logo} 
                      style={{
                        display:'flex',position:'absolute', marginTop:0,marginLeft:210, maxWidth:25,maxHeight:25,minWidth:25,minHeight:25
                      }} />
          <Tooltip title="add music">
            <Fab color="defualt"
          onClick={this.props.selecting}
          style={{display:'flex',position:'absolute', marginTop:40,marginLeft:210, maxWidth:25,maxHeight:25,minWidth:25,minHeight:25}}>
                <Add style={{fontSize:15}}/>
            </Fab>
          </Tooltip>
      </CardContent>
      <Typography variant='body1' align='left' style={{position:'absolute', left:80, marginTop:50, color:"rgba(0, 0, 0, 0.411)",marginLeft:10,fontSize:10,fontFamily:'Open Sans'}} >
             {this.props.artist} 
          </Typography>
          {
          this.state.isHovering &&
              <Tooltip title="play">
              <Fab
              color="defualt"
              onClick={this.props.clicked}
              // onClick={() => this.props.action()}
              style={{display:'flex',position:'absolute', marginTop:25,marginLeft:25, maxWidth:40,maxHeight:40,minWidth:40,minHeight:40}}>
              
                              <Play style={{fontSize:30}}/>
                          </Fab>
                      </Tooltip>
    }
    </Card>
  </ThemeProvider>
);
      }
    }
export default withStyles(styles)(post);
