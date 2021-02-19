import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {Link} from 'react-router-dom';

class createPlaylist extends Component{
  constructor(probs){
    super(probs);
    this.state={
      playlistName:'',
      playlistTag:'',
      image:null
    };
  }
  
  postDataHandler=()=>{
    const Input={playlistName:this.state.playlistName,
      playlistTag:this.state.playlistTag,
      image:this.state.image
    };
    axios.post('https://jsonplaceholder.typicode.com/users', Input)
  }
  fileSelectedHandler=event=>{
    this.setState({image:event.target.files[0]})
  }
  handlechangeName = e => {
    this.setState({playlistName : e.target.value });
  }
  handlechangeTag = e => {
    this.setState({playlistTag : e.target.value });
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    this.postDataHandler();
  }
  render(){
    return (
      <form className="createPlaylist" onSubmit={this.handleSubmit}>
        <h1>New Playlist:</h1>
        <input style={{display:'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput=fileInput}/>
        <button onClick={() => this.fileInput.click()}>Choose Image</button>
        <h4 className="playlistName">Name:</h4>
        <input name="playlistName" className="NameInput" type="text" value={this.state.playlistName} onChange={this.handlechangeName} />
        <h4 className="playlistTag">Tag:</h4>
        <input name="playlistTag" className="TagInput" type="text" value={this.state.playlistTag} onChange={this.handlechangeTag} />
        <br/>
        <Link to={'/playlist?q=playlist_'+this.state.playlistName}>
        <input className="playlistCreateButton" type="submit"  value="Createe"/>
        </Link>
        
      </form>
    );
  }
  
}

export default createPlaylist;