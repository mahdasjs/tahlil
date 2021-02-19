import React ,{Component}from 'react';
import './style.css'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RaisedButton from "material-ui/RaisedButton";
import Cookie from 'js-cookie'
import { Button } from '@material-ui/core';


class DeletePlaylist extends Component{
    constructor(props){
        super(props);
        this.state={
            show:this.props.showDelete
        }
        this.handleClick = this.handleClick.bind(this)
        this.delPlaylist = this.delPlaylist.bind(this)

        
    }
    handleClick = () => {
        this.props.onSuccessFullySave();
      };
    delPlaylist= () => {
        if( window.location.pathname.split('/').length===2){
            this.props.action()
        }
        else{
            window.location="/playlistPage"

        }
        axios({
            method:'delete',
            url: `http://localhost:8000/api/v1/playlist/${this.props.selected}/${Cookie.get('userid')}`,
            headers: { 'Authorization':`Token ${Cookie.get('token')}`},
        })
        axios({
            method: 'get',
            url: `http://localhost:8000/api/v1/playlist/${Cookie.get('userid')}`,
            headers: { 'Authorization': `Token ${Cookie.get('token')}` },
        })
            .then(response => {
                this.props.onSuccessFullySave();

            })
        }
 
    
    render(){
        
        return(

                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button label="Delete" onClick={this.delPlaylist}           color="secondary"
 >Delete</Button>
                    </Grid>
                    <Grid item>
                        <Button label="Cancel" onClick={this.handleClick}color="primary">Cancel</Button>
                    </Grid>

                </Grid>
        
        )
    }
}
export default DeletePlaylist;