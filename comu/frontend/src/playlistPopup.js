import React ,{Component}from 'react';
import './style.css'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import AddPlaylist from './addmusic'

class Playlistpopup extends Component{
  constructor(props){
    super(props)
    this.state={
      showPopUpDelete: false,
    }
  }
  childHandler = () => {
    this.setState({ showPopUpDelete: !this.state.showPopUpDelete, })
  }
    handleClick = () => {
        this.props.togglePopUp();
      };
  
    render(){
        
        return(
            <div style={{zIndex:10000}} className="deletePlaylist" >
            <div className="deletePlaylist\_inner">
            <Grid item xs={12} sm={12} >
                  <IconButton style={{position:"absolute",marginLeft:'95%',top:70}} onClick={this.handleClick}>
                    <CloseIcon style={{fontSize:25, color:"#fff"}}/>
                  </IconButton>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                    {this.props.trackbool?
                       <Button onClick={this.childHandler} style={{position:"absolute",marginLeft:'38%',top:90, maxWidth:70,minWidth:70}} title="add" variant="contained"> <Add style={{fontSize:12}}/>add</Button>
                       :null
                    }
                </Grid>
                <div className="playlistpopup">
                  
                
                  <Grid item xs={12} sm={12} lg={12}>
                       {this.props.SpotifyOrSoundcloud===false?
                         <iframe frameBorder="no" width="100%" height="380" scrolling="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/"+this.props.url+"&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"}></iframe>
                        :<iframe frameBorder="no" title={this.props.url} src={'https://open.spotify.com/embed/'+this.props.url }
                       width="100%" height="380" allowtransparency="true" allow="encrypted-media"/>  
                        }    
                 </Grid>
                 {this.state.showPopUpDelete ?

<AddPlaylist
  Name={this.props.Name}
  Url={this.props.url}
  SpotifyOrSoundcloud={!this.props.SpotifyOrSoundcloud}
  Image={this.props.Image}
  artist={this.props.artist}
  togglePopUpDelete={this.childHandler}
/>
: null
}
                </div>
            </div>
            </div> 
        
        )
    }
}
export default Playlistpopup;