import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import headerImage from './bokeh.jpg'
import Tooltip from '@material-ui/core/Tooltip';
import {If} from 'rc-if-else';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeletePlaylist from './deletePlaylist';

const theme = createMuiTheme({
    typography: {
      body1: {
        fontFamily:(     'Open Sans'),
        fontWeight: 500,
      },
    },
  });
  class post extends React.Component { 
    constructor(props){
      super(props)
      this.state={
        openDel:false,
        delete:false
      }
    }

    handleClickOpenDel = () => {
      this.props.action();
      this.setState({ openDel: true });
      
    };
  
    handleCloseDel = () => {
      this.props.action();

      this.setState({ openDel: false });
    } 
    
    render(){
      return(
        <ThemeProvider theme={theme}>
            <Card
           style={{ maxWidth:120,minWidth:120,maxHeight:160,minHeight:160,margin:10,padding:10 }}
           >
                             <Typography variant='body1' align='left'  onClick={this.props.clicked} style={{display:'flex',fontSize:14,fontFamily:'Open Sans'}} >
                  {this.props.title} 
                 
              </Typography>
              <CardMedia  onClick={this.props.clicked}
                  image={this.props.image||headerImage}
                  style={{display:'flex', maxHeight: 120, maxWidth: 120, minWidth: 120, minHeight: 120}}
              /> 
                            <If condition={this.props.title.length<16}>
                              

              <Typography variant='body1' align='left'  onClick={this.props.clicked} style={{display:'flex', fontSize:12,color:"rgb(0,0,0,0.6)",fontFamily:'Open Sans'}} >
                  {this.props.songs} songs 
                 
              </Typography>
              <Tooltip title="delete">
                                                        <IconButton
                                                            variant="contained"
                                                            className="delete"
                                                            style={{ display:'flex',position:'absolute', marginTop:-26,marginLeft:90, fontFamily:'Open Sans' }}
                                                            // containerElement={Link} to={'/delete'}
                                                            onClick={this.handleClickOpenDel}
                                                        >
                                                            <DeleteIcon  style={{fontSize:17}}/>
                                                        </IconButton>
                                                    </Tooltip >

              </If>
              <If condition={this.props.title.length>15}>
                            <div>
                            <Tooltip title=  {this.props.title} >

                            <Typography variant='body1' align='left' style={{display:'flex',position:'absolute', marginLeft:15, marginTop:135, fontSize:14,fontFamily:'Open Sans'}} >
                            {this.props.title.substring(0,15)}... 
                 
              </Typography>
              </Tooltip>
            
      </div>

                 
              </If>
              <Dialog
          style={{zIndex:100000000,maxHeight:600,marginTop:50}}
                open={this.state.openDel}
                onClose={this.handleCloseDel}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
              >
                <DialogTitle id="scroll-dialog-title">           
                <Typography variant="h6" style={{maxWidth:320, fontFamily:'Open Sans', alignItems:'left',justifyContent:'left',textAlign:'left'}}>
            Do you want to delete this playlist?</Typography>
                </DialogTitle>
                <DialogContent style={{marginBottom:20}}>
                <DeletePlaylist
                                                            {...this.props}
                                                            selected={this.props.selected}
                                                            togglePopUpDelete={this.handleClickOpenDel}
                                                            onSuccessFullySave={() => {
                                                                this.handleCloseDel()}}
                                                            />
                
                </DialogContent>
              </Dialog>
             
          </Card>
        
          
        </ThemeProvider>
);
      }
    }
export default post;
