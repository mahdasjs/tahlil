import React from 'react';
import Card from '@material-ui/core/Card';
import Cookie from 'js-cookie';
import axios from 'axios'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import {If} from 'rc-if-else';
import headerImage from './bokeh.jpg'
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardActions from '@material-ui/core/CardActions';
import FreeScrollbar from 'react-free-scrollbar';
import Postsong from './postsongs'
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Favorite from '@material-ui/icons/Favorite';
import Comment from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddPlaylist from './addmusic'
import Postcomments from './comment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { HardwareDesktopWindows } from 'material-ui/svg-icons';

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
        name:'null',
        songs:[],
        comment:null,
        postId:null,
        commentArrayLength:null,
        comments:[],
        like:false,
        likeLength:null,
        likeId:null,
        showPopUpDelete: false,
        selectedUrl: null,
        selectedname: null,
        SpotifyOrSoundcloud: false,
        SpotifyOrSoundcloudP: false,
        selectedImage: null,
        selecteartist: null,
        caption:null,
        date:null,
        image:null,
        profile_picture:null,
        visibility:'hidden',
        toggle:false,
        showAll:false,
        anchorEl: null,
      }
          this.childHandler = this.childHandler.bind(this)

    }
    handleClick = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    childHandler = () => {
      console.log(this.state.showPopUpDelete)
      this.setState({ showPopUpDelete: !this.state.showPopUpDelete })
    }
    componentDidMount() {
      axios({
        method: 'get',
        url: `http://localhost:8000/api/v1/posts/homepage/${this.props.postId}`,
        headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        }).then(response => {
          console.log(response.data.song)
            const image=response.data.playlist.image
            const date = response.data.date.split('T')[0]
            const caption=response.data.caption;
            const postId=response.data.id;
            const topMusic = response.data.song||[];
            const updatedtopMusic = topMusic.map(post => {
              return {
                  ...post,
                }
            });
            this.setState({image:image, caption:caption,date:date, songs: updatedtopMusic,postId:postId });
            console.log(this.state.songs)
         })
      axios({
        method: "get",
        url: `http://localhost:8000/api/v1/posts/comment/list/${this.props.postId}`,
        headers: {'Authorization':`Token ${Cookie.get('token')}`},
      }).then((response) => {
          console.log(response.data)
            const length=response.data.length;
            
            const commentdata=response.data;
            const updatedcommentdata=commentdata.map(comment=>{
                return{
                  ...comment,
                }
              }).reverse()
          this.setState({comments:updatedcommentdata,commentArrayLength:length});
          console.log(response.data.length)

        })
        axios({
          method: "get",
          url: `http://localhost:8000/api/v1/posts/like/list/${this.props.postId}`,
          headers: {'Authorization':`Token ${Cookie.get('token')}`},
        }).then((response) => {
          for(var i = 0; i<response.data.length; i++)
            if(this.props.logedinUser===response.data[i].user.username)
            {
              this.setState({likeId:response.data[i].id})
              this.setState({like:true})
              break
            }

            // formData.append(`hashtags[${i}]name`,this.state.playlistTag[i])
            console.log(response.data)
            const length=response.data.length;
       
              this.setState({likeLength:length});
              console.log(response.data.length)

          })
    }
    handleLike= (event) => {
      this.setState({ like: event.target.checked });
      if(this.state.like===false)
        {const formData = new FormData();
        formData.append("post",this.state.postId);
        axios({
          method: "post",
          url: `http://localhost:8000/api/v1/posts/like/create/`,
          headers: { 
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`},
            data:formData
          }).then((response)=>{
            this.setState({likeId:response.data.id})
            axios({
              method: "get",
              url: `http://localhost:8000/api/v1/posts/like/list/${this.props.postId}`,
              headers: {'Authorization':`Token ${Cookie.get('token')}`},
            }).then((response) => {
                console.log(response.data)
                const length=response.data.length;
           
                  this.setState({likeLength:length});
                  console.log(response.data.length)
    
              })
          })}
          else
        {const formData = new FormData();
        axios({
          method: "delete",
          url: `http://localhost:8000/api/v1/posts/like/${this.state.likeId}`,
          headers: { 
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`}
          }).then((response)=>{
            axios({
              method: "get",
              url: `http://localhost:8000/api/v1/posts/like/list/${this.props.postId}`,
              headers: {'Authorization':`Token ${Cookie.get('token')}`},
            }).then((response) => {
                console.log(response.data)
                const length=response.data.length;
           
                  this.setState({likeLength:length});
                  console.log(response.data.length)
    
              })
          })}
    };
    handlechangeComment = (e) => {
      this.setState({ comment: e.target.value });
      console.log(this.state.comment)
    };
    handlePostComment=(e)=>{
      if(this.state.comment!==null)
      {const formData = new FormData();
      formData.append("post",this.state.postId);
      formData.append("text",this.state.comment)
      axios({
        method: "post",
        url: "http://localhost:8000/api/v1/posts/comment/create/",
        headers: { 
          "Content-type": "multipart/form-data",
          'Authorization':`Token ${Cookie.get('token')}`},
          data:formData
        }).then((response) => {
        this.setState({comment:' '})
        axios({
          method: "get",
          url: `http://localhost:8000/api/v1/posts/comment/list/${this.props.postId}`,
          headers: {'Authorization':`Token ${Cookie.get('token')}`},
        }).then((response) => {
            console.log(response.data)
              const length=response.data.length;
              const commentdata=response.data;
              const updatedcommentdata=commentdata.map(comment=>{
                  return{
                    ...comment,
                  }
                }).reverse();
            this.setState({comments:updatedcommentdata,commentArrayLength:length});
            console.log(response.data.length)
            if(response.data.length!==0){              
              console.log(this.state.comments[0].text)
            }
          })
          })}
          else{
            alert("your comment can't be empty")
          }
      
    }
    SelectedHandler = (URL, bool, name, image, artist) => {
      if(URL.includes('tracks')){
        Cookie.set('url',URL);
        this.props.selecting(URL,true,name,image)

        console.log(URL, bool, name, image, artist)
        this.setState({ selectedUrl: URL, SpotifyOrSoundcloud: true, selectedname: name, selectedImage: image, selecteartist: artist });
      }
      else{
        Cookie.set('url',URL);
        this.props.selecting(URL,false,name,image)

        console.log(URL, bool, name, image, artist)
        this.setState({ selectedUrl: URL, SpotifyOrSoundcloud: false, selectedname: name, selectedImage: image, selecteartist: artist });
      }}      
      noIdea = (URL, bool, name, image, artist) => {
        if(URL.includes('tracks')){
          Cookie.set('url',URL);
          this.props.play(URL,true,name,image)
  
          console.log(URL, bool, name, image, artist)
          this.setState({ selectedUrl: URL, SpotifyOrSoundcloudP: true, selectedname: name, selectedImage: image, selecteartist: artist });
        }
        else{
          Cookie.set('url',URL);
          this.props.play(URL,false,name,image)
  
          console.log(URL, bool, name, image, artist)
          this.setState({ selectedUrl: URL, SpotifyOrSoundcloudP: false, selectedname: name, selectedImage: image, selecteartist: artist });
        }}      
    
    linkPost=()=>{
      this.props.history.push(`/homepage/${this.props.username}/${this.state.postId}`)
    }
    toggle=()=>{
      this.setState({visibility:null,toggle:!this.state.toggle})
    }
    showAll=()=>{
      this.setState({showAll:!this.state.showAll})
    }
    handelDelPost=()=>{
      console.log(this.props.postId)
      if(Cookie.get('username')===this.props.username)
      {
        axios({
          method: "delete",
          url: `http://localhost:8000/api/v1/posts/profile/${this.props.postId}`,
          headers: { 
            'Authorization':`Token ${Cookie.get('token')}`}
          }).then((response)=>{
            axios({
              method: 'get',
              url: `http://localhost:8000/api/v1/posts/homepage/${this.props.postId}`,
              headers: { 'Authorization': `Token ${Cookie.get('token')}` },
              }).then(response => {
                console.log(response.data.song)
                  const image=response.data.playlist.image
                  const date = response.data.date.split('T')[0]
                  const caption=response.data.caption;
                  const postId=response.data.id;
                  const topMusic = response.data.song||[];
                  const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                      }
                  });
                  this.setState({image:image, caption:caption,date:date, songs: updatedtopMusic,postId:postId });
                  console.log(this.state.songs)
               })
            axios({
              method: "get",
              url: `http://localhost:8000/api/v1/posts/comment/list/${this.props.postId}`,
              headers: {'Authorization':`Token ${Cookie.get('token')}`},
            }).then((response) => {
                console.log(response.data)
                  const length=response.data.length;
                  
                  const commentdata=response.data;
                  const updatedcommentdata=commentdata.map(comment=>{
                      return{
                        ...comment,
                      }
                    }).reverse()
                this.setState({comments:updatedcommentdata,commentArrayLength:length});
                console.log(response.data.length)
      
              })
              axios({
                method: "get",
                url: `http://localhost:8000/api/v1/posts/like/list/${this.props.postId}`,
                headers: {'Authorization':`Token ${Cookie.get('token')}`},
              }).then((response) => {
                for(var i = 0; i<response.data.length; i++)
                  if(this.props.logedinUser===response.data[i].user.username)
                  {
                    this.setState({likeId:response.data[i].id})
                    this.setState({like:true})
                    break
                  }
      
                  // formData.append(`hashtags[${i}]name`,this.state.playlistTag[i])
                  console.log(response.data)
                  const length=response.data.length;
             
                    this.setState({likeLength:length});
                    console.log(response.data.length)
                    })
                            })
        }
      else{
        alert('you did not post this')
      }
      this.handleClose()
    }
    goToprofile=()=>{
      window.location.replace(`user/${this.props.postUser}`)
    }
    render(){
      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);
  
        let posts = this.state.songs.map(post => {
            return <Postsong
            action={this.childHandler}
            key={post.url}
              title={post.track_name}
              image={post.image}
              url={post.track_url}
              clicked={() => this.SelectedHandler(post.track_url, post.ids, post.track_name, post.image, post.artist)} 
              onclick={() => this.noIdea(post.track_url, post.ids, post.track_name, post.image, post.artist)} 
              />;
            });
          let comments = this.state.comments.map(post => {
            return <Postcomments
              avatar={post.user.profile_picture}
              key={post.id}
              id={post.id}
              text={post.text}
              username={post.user.username}
              userid={post.user.id}
              postUser={this.props.postUser}
              />;
          });
      return(
        <ThemeProvider theme={theme}>
          <Card
            key={this.props.id}
            style={{
              borderRadius:10,
              display: "flex",
              margin:30,
              marginLeft:0,
              marginTop: 5,
              marginRight: 10,
              
            }}
            >

            <CardContent style={{                    width:'120'}}>
              <Grid container item xs={12} sm={12} lg={12}>
                <Grid  item xs={12} sm={12} lg={12}>
                  <CardHeader
                  style={{
                    marginTop:-17,
                    marginLeft:-20,
                    padding:20,
                    height:'30%',
                    width:'120%',
                    color:'#fff',
                    backgroundColor:'#303f9f',
                  
                  }}
                 
                  avatar={

                  <Avatar
                  onClick={this.goToprofile}

                  onclick={this.handleClick}
                  src={this.props.profile_picture||this.state.profile_picture}
                   aria-label="recipe">
                  </Avatar>
                  }
                  
                  action={
                    <div               style={{
                      marginLeft:-150,
                      marginTop:-5,
                    }}>
                      { window.location.pathname.split('/')[1]==='user'?
                      <div>
                                          <IconButton
                                          aria-label="settings"
                                          aria-owns={open ? 'fade-menu' : undefined}
                                          aria-haspopup="true"
                                          onClick={this.handleClick}
                                          
                                          >
                                           <MoreVertIcon  style={{color:'#fff'}}/>
                                         </IconButton>
                                           <Menu
                                           id="fade-menu"
                                           anchorEl={anchorEl}
                                           open={open}
                                           onClose={this.handleClose}
                                           TransitionComponent={Fade}
                                         >
                                           <MenuItem onClick={this.handelDelPost}>Delete</MenuItem>
                                         </Menu>
                                         </div>
                        :null
                      }

                    </div>
                  }
        
            titleTypographyProps={{variant:'h6' }}

                  title={this.props.username}
                  />
                  
                </Grid>     
              
                <Grid item xs={12} sm={12} md={12} lg={12}>

                      <Typography
                      align="justify"
                      variant="body1"
                      style={{
                        marginTop:-10,
                        marginBottom:5,
                      marginLeft:5,
                      fontSize:17
                      ,fontFamily:'Open Sans'
                      }}
                      >{this.state.caption||this.props.title}
                      </Typography>
                </Grid>    
                <Grid  item xs={12} sm={12} md={12} lg={12}
                                  style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                  <img
                    src={this.props.image ||this.state.image|| headerImage}
                    style={{
                      maxWidth:'100%',
                      height:'auto',
                      maxHeight:250          
                    }}
                  />
                </Grid>   
                {/* </Grid>    */}
                
                <Grid  item xs={12} sm={12} lg={12} >
                  <div                       
 style={{                            
                    marginTop:10,
                     }}>
                       <div style={{fontSize:18,fontWeight: 'bold'}}>
                       Songs
                       </div>
                       <hr/>
                    <PerfectScrollbar style={{maxHeight:135}} >
                      {posts}
                    </PerfectScrollbar>
                  </div>
                </Grid>
                <Grid  style={{display:'flex', flexWrap:'nowrap' ,marginLeft:'30%'}} item xs={1} sm={1} lg={1}>
                  <CardActions disableSpacing>
                    <FormControlLabel
                    style={{marginRight:'70%'}}
                    label={this.state.likeLength}
                      control={
                        <Checkbox  
                        checked={this.state.like} 
                        onChange={this.handleLike}    
                       icon={<FavoriteBorder style={{fontSize:30}} />} 
                       checkedIcon={<Favorite style={{fontSize:30}}/>}
                      name="checkedH" />}
                   />
                    <FormControlLabel
                    label={this.state.commentArrayLength}
                      control={
                        <Checkbox  
                        onChange={this.toggle}  
                        color="secondary" 
                       icon={<Comment style={{fontSize:30}} />} 
                       checkedIcon={<Comment style={{fontSize:30}}/>}
                      name="checkedH" />}
                   />
                  </CardActions>
                
                </Grid>         
                <If condition={this.state.toggle===true}>
                       <Grid style={{display:'flex',flexWrap:'nowrap', visibility:this.state.visibility }}  container item xs={12} sm={12} lg={12}>

                <Grid item xs={10} sm={10} lg={10} >
                  <div style={{ display:'flex',flexWrap:'nowrap',width:'100%'}}>
                    <TextareaAutosize value={this.state.comment} onChange={this.handlechangeComment} rowsMin={1}  rowsMax={1}  aria-label="caption" placeholder="Add comment..." 
                    // style={{paddingTop:15, borderStyle:'hidden', outline:'none', fontSize:15, width:'110%'}}
                    style={{borderStyle:'hidden',  outline:'none',backgroundColor:"rgb(255, 250, 252)", padding:10,  fontSize:15, width:'100%'}}

                     />
                  </div>
                </Grid>
                <Grid  item xs={2} sm={2} lg={2}>
                <Button onClick={this.handlePostComment} 
                style={{}}
                 color="secondary"
                >
                Send
                </Button>
              </Grid>
               
                </Grid>
                <If condition ={this.state.commentArrayLength>1 && this.state.showAll===true}>
                <Grid  item xs={12} sm={12} lg={12}  style={{height:150,width:'100%' ,marginTop:10, visibility:this.state.visibility}}>
                <PerfectScrollbar>
                  {comments}
                  </PerfectScrollbar>

                  </Grid>

                </If>
                <If condition ={this.state.showAll===false}>

                <Grid  item xs={12} sm={12} lg={12}  style={{marginTop:10, visibility:this.state.visibility}}>
                    {comments[0]}
                    {/* {comments[this.state.commentArrayLength-2]} */}
                  </Grid>
                  </If>

                  <If  condition ={this.state.commentArrayLength>1 &&this.state.showAll===false}>

                  <Grid  item xs={12} sm={12} lg={12} style={{ visibility:this.state.visibility}}>
                    <Button
                    
                    onClick={this.showAll}
                    variant="body1"
                    align="justify"
                    style={{
                      display:'table',
                      marginRight:'auto',
                      marginLeft:'auto',
                    fontSize: 12,
                    fontSize:13,
                    marginBottom:-20,
                    color:'rgba(0, 0, 0, 0.4)'
                    }}
                    >
                      show more                    
                    </Button>
                  </Grid>

                </If>  <If  condition ={this.state.commentArrayLength>1 && this.state.showAll===true}>

<Grid  item xs={12} sm={12} lg={12} style={{ visibility:this.state.visibility}}>
  <Button
  // onClick={this.linkPost}
  onClick={this.showAll}
  variant="body1"
  align="justify"
  style={{
    display:'table',
    marginRight:'auto',
    marginLeft:'auto',
  fontSize: 12,
  fontSize:13,
  marginBottom:-20,
  color:'rgba(0, 0, 0, 0.4)'
  }}
  >
    show less                    
  </Button>
</Grid>

</If>
                </If>
              </Grid>

            </CardContent>

          </Card>
        </ThemeProvider>
  );
      }
    }
export default post;
