import React from 'react';
import Cookie from 'js-cookie';
import './player.css'
class player extends React.Component {  
  constructor(props){
    super(props)
    this.state={
      SpotifyOrSoundcloud:false,
      show:false,
      selectedUrlX:Cookie.get('url')
    }
  }
  componentDidMount(){
    if(Cookie.get('url')!==undefined)
{    if(Cookie.get('url').includes('tracks')){
      this.setState({SpotifyOrSoundcloud:true,show:false})
    }
    else{
      this.setState({SpotifyOrSoundcloud:false,show:true})
    }}
  }
  render() {  
    return (  
      <div className='player'>
    {this.state.SpotifyOrSoundcloud === true ?
      <iframe width="90%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'+ this.state.selectedUrlX +'&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>  
      :null   
    }
        {this.state.SpotifyOrSoundcloud===false?
<iframe  src={'https://open.spotify.com/embed/' + this.state.selectedUrlX}
      width="90%" height="300" frameBorder="0" allowtransparency="true" allow="encrypted-media" />        :null
        }
        </div>
            
    );  
  }  
}  

export default player;
