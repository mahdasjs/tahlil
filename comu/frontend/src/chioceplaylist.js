import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import headerImage from './bokeh.jpg'
import Grid from '@material-ui/core/Grid';

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
      super(props);
      this.state={
          color:null
      }
      this.handleMouseHover = this.handleMouseHover.bind(this);
      this.handleMouseleave = this.handleMouseleave.bind(this);

    }
    handleMouseHover() {
        this.setState({color:"rgba(112, 128, 144, 0.342)"})
      }
      handleMouseleave() {
        this.setState({color:"#fff"})
      }
    render(){
      return(
         <Grid container>
           <Grid item xs={12} sm={12} md={12} lg={12}>
    <Card onMouseEnter={this.handleMouseHover}  onMouseLeave={this.handleMouseleave} onClick={this.props.clicked}  
     style={{ display: 'flex',maxHeight:60,minHeight:60,marginTop:5,backgroundColor:`${this.state.color}`}}>  
      <CardContent style={{display:'flex',flexWrap:'nowrap', alignItems: 'left'}}>
        <CardMedia
            image={this.props.image||headerImage}
            style={{marginTop:-20,marginLeft:-20, maxHeight: 65, maxWidth: 65, minWidth: 65, minHeight: 65}}/>   
            <div style={{flexWrap:'wrap', alignItems: 'left'}}>
          <Typography variant='body1' align='left' style={{marginLeft:15,marginTop:-5, fontSize:15,fontFamily:'Open Sans'}} >
             {this.props.title} 
          </Typography>
          <Typography variant='body1' align='left'  onClick={this.props.clicked} style={{marginLeft:15,marginTop:3, display:'flex', fontSize:12,color:"rgb(0,0,0,0.6)",fontFamily:'Open Sans'}} >
                  {this.props.songs} songs 
                 
              </Typography>
              </div>
      </CardContent>
    </Card>
    </Grid>
    </Grid>
);
      }
    }
export default post;