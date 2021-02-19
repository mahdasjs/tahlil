import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import TopMusic from './searchrsult';
import axios from 'axios';
import './homepage.css';
import HorizontalScroll from 'react-scroll-horizontal';
import SearchPopUp from './playlistPopup';
import Cookie from 'js-cookie'
import CircularProgress from '@material-ui/core/CircularProgress';
import AddPlaylist from './addmusic'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
class  result  extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      search : JSON.stringify (window.location.search.split('_')[1]).replace(/^"(.*)"$/, '$1').replace('%20'," ")||null,
      data: "Default parent state",
      posts:[],
      searchmusic: [],
      album:[],
      artist:[],
      playlist:[],
      selected:null,
      SearchPopUp:false,
      isHovering: false,
      selectedUrl: null,
      selectedname: null,
      SpotifyOrSoundcloud: false,
      SpotifyOrSoundcloudX: false,
      selectedImage: null,
      selecteartist: null,
      trackbool:null,
      loading:true,
      showPopUpDelete: false,
      openAdd:false,

    }
    this.togglePopUpAdd = this.togglePopUpAdd.bind(this)
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this)
    this.childHandler = this.childHandler.bind(this)
  }
  togglePopUpAdd = () => {
    this.setState({ showPopUpDelete: !this.state.showPopUpDelete })
}
handleClickOpenAdd = () => {
  this.setState({ openAdd: true });
};

handleCloseAdd = () => {
  this.setState({ openAdd: false });
};
  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }
  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

childHandler(dataFromChild) {
  // log our state before and after we updated it
  this.setState({
    SearchPopUp:!this.state.SearchPopUp,
      data: dataFromChild
  });
}
togglePopUp = () => {
  this.setState({ SearchPopUp: !this.state.SearchPopUp })
}
call=()=>{
  
}
componentDidMount () {
  const searchmusic = axios({
        method: 'get',
        url: `http://localhost:8000/api/v1/songs/search/?entry=${this.state.search}&filters=album+track+artist+playlist`,
        headers: { 'Authorization':`Token ${Cookie.get('token')}`},
      })
    .then(response => {
      const searchmusic = response.data.track;
      const album=response.data.album;
      const artist=response.data.artist;
      const playlist=response.data.playlist;
      const updatedsearchmusic = searchmusic.map(post => {
        return {
            ...post,
        }
      });
      const updatedalbum = album.map(post => {
        return {
            ...post,
        }
      });

      const updatedartist = artist.map(post => {
        return {
            ...post,
        }
      });
      const updatedplaylist = playlist.map(post => {
            return {
                ...post,
            }
        });  

        this.setState({ searchmusic: updatedsearchmusic.sort(() => Math.random() - 0.5),
          album:updatedalbum.sort(() => Math.random() - 0.5),
          artist:updatedartist.sort(() => Math.random() - 0.5),
          playlist:updatedplaylist.sort(() => Math.random() - 0.5) });
          this.setState({loading:false})

    })
    .catch(error => {
        this.setState({ error: true });
    });
}
  handleChange = (event, value) => {
    this.setState({ value });
  };
  SelectedHandler = (URL, bool, name, image, artist,trackbool) => {
    Cookie.set('url',URL);
    this.setState({ selected: URL, SpotifyOrSoundcloud: bool, selectedname: name, selectedImage: image, selecteartist: artist,trackbool:trackbool });
  }
  
  addHandler = (URL, bool, name, image, artist,trackbool) => {
    Cookie.set('url',URL);
    this.setState({ selectedURL: URL, SpotifyOrSoundcloudX: bool, selectedname: name, selectedImage: image, selecteartist: artist,trackbool:trackbool });
    this.handleClickOpenAdd()
  }
  render(){
    const { value } = this.state;
    let searchmusic = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
    if (!this.state.error) {
      searchmusic = this.state.searchmusic.map(post => {
            return <TopMusic 
            play={this.call}

            key={post.track_url}
                title={post.track_name} 
                image={post.track_image}
                artist={post.artists_name}
                url={post.track_url}
                ids={post.ids}
                addbool={true}
                clicked={() => this.SelectedHandler(post.track_url, post.ids, post.track_name, post.track_image, post.artists_name,false)}
                action={() => this.addHandler(post.track_url, post.ids, post.track_name, post.track_image, post.artists_name,false)}

                 />;
              });
    }
    let album = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
    if (!this.state.error) {
      album = this.state.album.map(post => {
            return <TopMusic 
            action={this.togglePopUpAdd}
            play={this.call}

            key={post.album_url}
                title={post.album_name} 
                image={post.album_image}
                url={post.album_url}
                ids={post.ids}
                addbool={false}
                clicked={() => this.SelectedHandler(post.album_url, post.ids, post.album_name, post.album_image,null,true)} />;
              });
    }
    let playlist = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
    if (!this.state.error) {
      playlist = this.state.playlist.map(post => {
            return <TopMusic 
            play={this.call}
            key={post.playlist_url}
                title={post.playlist_name} 
                image={post.playlist_image}
                url={post.playlist_url}
                ids={post.ids}
                addbool={false}
                clicked={() => this.SelectedHandler(post.playlist_url, post.ids, post.playlist_name, post.playlist_image,null,true)}
                 />;
              });
    }
    let artist = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
    if (!this.state.error) {
      artist = this.state.artist.map(post => {
            return <TopMusic 
            action={this.togglePopUpAdd}
            play={this.call}
                key={post.artist_url}
                title={post.artist_name} 
                image={post.artist_image}
                artist={post.artist_followers}
                url={post.artist_url}
                ids={post.ids}
                addbool={false}
                followerbool={true}
                clicked={() => this.SelectedHandler(post.artist_url, post.ids, post.artist_name, post.artist_image, post.artist_followers,true)} />;
              });
    }
    return(
      <div className="search" >
        {this.state.loading?
                    <div style={{display: "flex",
                    fontFamily:'Open Sans',
                    justifyContent: "center",
                    alignItems: "center",
                    height:'80%'}}>
                        <CircularProgress disableShrink />
                         Loading ...
                    </div>
                 
                :  <Grid container>
                <Grid item xs={12} sm={12} lg={12}>
                <div style={{fontFamily:'Open Sans', textAlign:'center'}} >
                 <h2>Search results for “{this.state.search}”</h2>
                </div>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} style={{marginTop:-20}}>
                      <div style={{height:'250px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>Tracks </h2>
                          {this.state.loading?
                           <CircularProgress disableShrink style={{display:'table',marginLeft:'auto' ,marginRight:'auto'}}/>
                          :null
                          }
                          <HorizontalScroll  >
                              {searchmusic}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                      <div style={{height:'250px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>Album </h2>
                          {this.state.loading?
                           <CircularProgress disableShrink style={{display:'table',marginLeft:'auto' ,marginRight:'auto'}}/>
                          :null
                          }
                          <HorizontalScroll >
                              {album}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                      <div style={{height:'250px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>Playlists </h2>
                          {this.state.loading?
                           <CircularProgress disableShrink style={{display:'table',marginLeft:'auto' ,marginRight:'auto'}}/>
                          :null
                          }
                          <HorizontalScroll  >
                              {playlist}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                      <div style={{fontFamily:'Open Sans',height:'250px',marginBottom:160}}>
                          <h2 style={{ fontSize: 25, lineHeight: 0.1}}>Artist </h2>
                          {this.state.loading?
                           <CircularProgress disableShrink style={{display:'table',marginLeft:'auto' ,marginRight:'auto'}}/>
                          :null
                          }
                          <HorizontalScroll  >
                              {artist}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  <Grid>
                  {this.state.selected ?
                          <div className="player1">
                            {this.state.SpotifyOrSoundcloud === false ?
                              <iframe  title={this.state.selected} frameBorder="no" width="100%" height="80" scrolling="no" allow="autoplay" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/" + this.state.selected + "&color=%23848484&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"}></iframe>
                              : <iframe title={this.state.selected} frameBorder="no" src={'https://open.spotify.com/embed/' + this.state.selected}
                                width="100%" height="80"  allowtransparency="true" allow="encrypted-media" />
                            }
                          </div>
                          : null
                        }
                        </Grid>
                  <Grid item xs={12} sm={12} lg={12} style={{marginLeft:-245}}>
                    
                      <header  >
                        {this.state.selected ?
                          <div className="player">
                            {this.state.SpotifyOrSoundcloud === false ?
                <iframe width="90%" height="300" scrolling="no" frameborder="no" allow="autoplay" src={'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'+ this.state.selected +'&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'}></iframe>     
                :<iframe  src={'https://open.spotify.com/embed/' + this.state.selected}
                width="90%" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media" />  
                            }
                          </div>
                          : null
                        }
                      </header>
                    </Grid> 
                    <Dialog
                          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                          open={this.state.openAdd}
                          onClose={this.handleCloseAdd}
                          aria-labelledby="scroll-dialog-title"
                          aria-describedby="scroll-dialog-description">
                          <DialogTitle id="scroll-dialog-title">           
                          <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
                          adding  "{this.state.selectedname}" to:</Typography>
                          </DialogTitle>
                          <DialogContent style={{marginBottom:20}}>
                          <AddPlaylist
                          Name={this.state.selectedname}
                          Url={this.state.selectedURL}
                          SpotifyOrSoundcloud={this.state.SpotifyOrSoundcloudX}
                          Image={this.state.selectedImage}
                          artist={this.state.selecteartist}
                          togglePopUpDelete={this.handleClickOpenAdd}
                          onSuccessFullySave={() => {
                            this.handleCloseAdd()}}
                        />
                          </DialogContent>
                        </Dialog>
                </Grid>
                }   
    
      </div>
    )
  }
}
export default result