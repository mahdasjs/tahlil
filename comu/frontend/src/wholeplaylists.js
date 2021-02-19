import React, { Component } from 'react';
import axios from 'axios';
import { createMuiTheme } from '@material-ui/core/styles';
import TopMusic from './myplaylists';
import './style.css';
import './playlistPage.css';
import './homepage.css';
import { ThemeProvider } from '@material-ui/styles';
import Cookie from 'js-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
    typography: {
        body1: {
            fontFamily: ("Verdana, sans-serif "),
            fontWeight: 500,
            fontStretch: ("ultra-expanded")
        }
    },
});




class playlistPage extends Component {

    constructor(probs) {
        super(probs);
        this.state = {
            selected: window.location.pathname.split('/')[2]||41,
            topMusic: [],
            private: null,
            error: false,
            selectedplatform:null,
            selectedid:null,
            songslength:null,
            delete:false,
            loading:true,
        }

    }
    handle=()=>{
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${Cookie.get('userid')}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data;
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topMusic: updatedtopMusic });
            })
            .catch(error => {
                this.setState({ error: true });
            });
      
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${Cookie.get('userid')}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                const topMusic = response.data;
                const updatedtopMusic = topMusic.map(post => {
                    return {
                        ...post,
                    }
                });
                this.setState({ topMusic: updatedtopMusic });
                this.setState({loading:false})

            })
            .catch(error => {
                this.setState({ error: true });
                
            });

    }
    SelectedHandler = (id,platform) => {
        this.setState({ selected: id,selectedplatform:platform });
        this.props.history.push("/playlistPage/" + id+"/"+Cookie.get('userid'))
    }
  

    render() {
        let topMusic = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            topMusic = this.state.topMusic.map(post => {
                return <TopMusic
                    action={this.handle}
                    key={post.id}
                    title={post.title}
                    image={post.image}
                    songs={post.songs.length}
                    selected={post.id}
                    url={post.id}
                    clicked={() => this.SelectedHandler(post.id)} />;
            });
        }
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                    <div className="playlistpage" >   
                    {this.state.loading?
                    <div style={{display: "flex",
                    fontFamily:'Open Sans',
                    justifyContent: "center",
                    alignItems: "center",
                    height:'80%'}}>
                        <CircularProgress disableShrink />
                         Loading ...
                    </div>
                 
                :<div>{this.state.topMusic.length===0?
                    <div style={{display:'flex',flexWrap:'wrap',marginBottom:50}} >
                    <Typography variant="h6" style={{marginTop:10, fontFamily:'Open Sans', alignItems:'center',justifyContent:'center',textAlign:'center'}}>
You didn't create any playlist yet
           </Typography>           
         </div>                    
             :  <div style={{display:'flex',flexWrap:'wrap',marginBottom:50}} >
             {topMusic}
        
         </div>                 

             }
             </div>
                }   
                 
                
                               
                    </div>
                   
            </ThemeProvider>

        );
    }
}
export default playlistPage;
