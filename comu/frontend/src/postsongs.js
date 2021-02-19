import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {If} from 'rc-if-else'
import { Grid } from '@material-ui/core';
import Plus from "@material-ui/icons/Add";
import Play from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import IconButton from '@material-ui/core/IconButton';
import './app.css';
import Delete from '@material-ui/icons/DeleteSharp';
import Cookie from 'js-cookie';
import axios from 'axios'
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
      this.state={
        logo:null,
        play:false
      }
    }
    componentDidMount() {
      
    }
    handleClick=()=>{
      this.setState({play:!this.state.play})
    }
    delmusic= () => {
      if(this.props.ids==='Soundcloud')
     { axios({
          method:'delete',
          url: `http://localhost:8000/api/v1/songs/soundcloud/${this.props.id}`,
          headers: { 'Authorization':`Token ${Cookie.get('token')}`},
        
      })
      this.props.Reaload()
    }
      else{
        axios({
          method:'delete',
          url: `http://localhost:8000/api/v1/songs/spotify/${this.props.id}`,
          headers: { 'Authorization':`Token ${Cookie.get('token')}`}
      })
      this.props.Reaload()
    }

      this.props.Reaload()
  }
    render(){
      return(
       <ThemeProvider theme={theme}>
    <Card  
    // onClick={this.props.Reaload}
     style={{marginTop:4,backgroundColor:'rgba(0, 0, 0, 0.012)', display: 'flex',flexWrap:'nowrap' ,maxHeight:40,minHeight:40 }}>  
          <Grid container>
     <Grid  item xs={8} sm={10} md={10} lg={10}>
      <CardContent style={{display:'flex',flexWrap:'nowrap', alignContent: 'left', alignItems: 'left'}}>
        <CardMedia
            image={this.props.image}
            style={{ maxHeight: 50, maxWidth: 50, minWidth: 50, minHeight: 50,marginTop:-18,marginLeft:-15}}/>   
            <div className="navbar">
            <If condition={this.props.title.length<51}>

          <Typography variant='body1' align='left' style={{marginLeft:10,marginTop:-5,fontSize:13,fontFamily:'Open Sans'}} >
             {this.props.title} 
          </Typography>
          </If>
          <If condition={this.props.title.length>50}>
          <div>
          <Tooltip title=  {this.props.title} >
          <Typography variant='body1' align='left' style={{marginLeft:10,marginTop:-5,fontSize:13,fontFamily:'Open Sans'}} >
          {this.props.title.substring(0,47)}... 
          </Typography>
          </Tooltip>
          </div>

          </If>
          </div>

          <div  className="bottombar">
          <Typography variant='body1' align='left' style={{display:'flex',flexWrap:'nowrap', marginLeft:10,marginTop:-5,fontSize:10,fontFamily:'Open Sans'}} >
             {this.props.title.substring(0,17)} ...

          </Typography>
          </div>
      </CardContent>
      </Grid> 
      <Grid  item xs={2} sm={1} md={1} lg={1}>
        {!this.state.play?
        <div onClick={this.handleClick}>
        <Tooltip  title="Play">
                                                        <IconButton
                                                            variant="contained"
                                                            style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                                                            onClick={this.props.onclick}  

                                                            // containerElement={Link} to={this.handleClone}
                                                        >
                                                            <Play/>
                                                        </IconButton>
                </Tooltip>
                </div>
                :
                <div onClick={this.handleClick}>
                <Tooltip  title="Pause">
                                                                <IconButton
                                                                    variant="contained"
                                                                    style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                                                                    onClick={this.props.onclick}  
        
                                                                    // containerElement={Link} to={this.handleClone}
                                                                >
                                                                    <Pause/>
                                                                </IconButton>
                        </Tooltip>
                        </div>
        }
        
      </Grid>
      <Grid  item xs={2} sm={1} md={1} lg={1}>
     {this.props.location!=='playlistpage'?
      <Tooltip  title="Add">
                                                        <IconButton
                                                            variant="contained"
                                                            style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                                                            onClick={this.props.clicked}  



                                                            // containerElement={Link} to={this.handleClone}
                                                        >
                                                            <Plus
                                                                                                                        
                                                                          style={{marginTop:-2}}

                                                             />
                                                        </IconButton>
                </Tooltip>
                :<Tooltip  title="Delete">
                <IconButton
                    variant="contained"
                    style={{maxWidth:30,minWidth:30,maxHeight:30,minHeight:30,marginTop:5}}
                    onClick={this.delmusic}



                    // containerElement={Link} to={this.handleClone}
                >
                    <Delete
                                                                                
                                  style={{marginTop:-8,fontSize:19}}

                     />
                </IconButton>
</Tooltip>
                }
      </Grid>
      </Grid>

    </Card>
  </ThemeProvider>
);
      }
    }
export default post;
