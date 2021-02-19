import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Cookie from 'js-cookie'
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
        color:null,
        seen:false,
        seenid:null
      }
      this.handleSeen = this.handleSeen.bind(this);

    }
    handlePopoverOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handlePopoverClose = () => {
      this.setState({ anchorEl: null });
    };

    handleSeen= (event) => {
      this.setState({color:"#fff"})
      if(this.state.seen===false)
        {
          this.setState({color:"#fff"})
          const formData = new FormData();
        formData.append("story",this.props.storyid);
        axios({
          method: "post",
          url: `http://localhost:8000/api/v1/stories/seen/create/`,
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
          })
        }
        this.setState({ seen: true });

    };
    componentDidMount() {
      axios({
        method: "get",
        url: `http://localhost:8000/api/v1/stories/seen/list/${this.props.storyid}`,
        headers: {'Authorization':`Token ${Cookie.get('token')}`},
      })
      .then((response) => {
        for(var i = 0; i<response.data.length; i++)
          if(this.props.logedinUser===response.data[i].user.username)
          {
            this.setState({seenid:response.data[i].id})
            this.setState({seen:true})
            break
          }
          console.log(this.state.seen)
          if(this.state.seen===true)
          {
            this.setState({color:"#fff"})
          }
          else{
            this.setState({color:"#D81B60"})
    
          }
        })

      
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
            <div                              onClick={this.props.selecting}
            style={{backgroundColor:`${this.state.color}` ,borderRadius:100,margin:2}}
            >
               <Avatar
               onClick={this.handleSeen} 
                          src={this.props.profile_picture}
                          style={{
                            width: 70,
                            height: 70,
                            margin:5
                          }}
                        />
                        </div>
        </ThemeProvider>
);
      }
    }
    export default withStyles(styles)(post);
