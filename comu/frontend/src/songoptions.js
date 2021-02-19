import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import headerImage from './bokeh.jpg'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid'
import {If} from 'rc-if-else';
import Tooltip from '@material-ui/core/Tooltip';

class post extends React.Component {  
    constructor(props){
      super(props);
      this.state={
        checkedA:true
      }
    }
    handleChange = (event) => {
      this.props.action()
      this.setState({ checkedA:!this.state.checkedA});
    };
  

    render(){
      return(

<Grid container>
    <Grid item xs={12} sm={12} md={12} lg={12}>
    <Card onMouseEnter={this.handleMouseHover}  onMouseLeave={this.handleMouseleave} onClick={this.props.clicked}  
     style={{ display: 'flex',maxHeight:40,minHeight:40,marginTop:5,backgroundColor:`${this.state.color}`}}>  
     <Grid item xs={10} sm={4} md={4} lg={11} >

    <CardContent style={{display:'flex',flexWrap:'nowrap', alignItems: 'left'}}>
    <CardMedia
    image={this.props.image||headerImage}
    style={{ maxHeight: 50, maxWidth: 50, minWidth: 50, minHeight: 50,marginTop:-18,marginLeft:-15}}/>   
    <div className="navbar">
            <If condition={this.props.title.length<51}>

          <Typography variant='body1' align='left' style={{marginLeft:10,marginTop:-5,fontSize:13,fontFamily:'Open Sans'}} >
             {this.props.title} 
          </Typography>
          </If>
          <If condition={this.props.title.length>50}>
          <div>
          <Tooltip title=  {this.props.title} >
          <Typography variant='body1' align='left' style={{marginLeft:10,marginTop:-5,fontSize:13,fontFamily:'Open Sans'}} >
          {this.props.title.substring(0,47)}... 
          </Typography>
          </Tooltip>
          </div>

          </If>
          </div>

          <div  className="bottombar">
          <Typography variant='body1' align='left' style={{display:'flex',flexWrap:'nowrap', marginLeft:10,marginTop:-5,fontSize:10,fontFamily:'Open Sans'}} >
             {this.props.title.substring(0,17)} ...

          </Typography>
          </div>
    </CardContent>
    </Grid>

    <Grid item xs={2} sm={4} md={4} lg={1} >
    <FormControlLabel style={{marginTop:0}} 
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA" />}
      />
      </Grid>
    </Card>
    </Grid>
    </Grid>
);      }
    }
export default post;