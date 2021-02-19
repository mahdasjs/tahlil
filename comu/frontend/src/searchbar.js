import React from "react";
import { fade } from "@material-ui/core/styles";
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import './homepage.css'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import headerImage from './bokeh.jpg';
import Cookie from 'js-cookie'
const filter = createFilterOptions();

const useStyles = theme => ({
  root: {
    flexGrow: 0.2
  }, 
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight:770,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(0),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "#fff"
  },

});

class SearchAppBar extends React.Component {
  constructor(props) {
    super(props);
      this.state = { 
        value:null,
        posts: [],
        error: false,
        searchinput:null

      };
    }
    handlechange =( e )=> {
      if( this.props.action()===undefined   ){
        this.props.action(e.target.value)

      }
          axios({
        method: 'get',
        url: `http://localhost:8000/api/v1/songs/autocomplete/?entry=${e.target.value }`,
        headers: { 'Authorization': `Token ${Cookie.get('token')}` },
    })          .then( response => {
            console.log(response.data.name)
              const posts = response.data.name;
              const updatedPosts = posts.map(post => {
                  return {
                      ...post,
                  }
              });
              this.setState({posts: updatedPosts});
          } )
          .catch(error => {
              this.setState({error: true});
          });}

  render(){
    const {classes} = this.props;
  return (
    <div className={classes.root}>
       <div className={classes.search}>
          <div className={classes.searchIcon}>
          </div>
          <Autocomplete
      value={this.state.value}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          this.setState({
            name: newValue.inputValue,
          });


          return;
        }

        this.setState(newValue);
        console.log(newValue.name[0])
        this.props.action(newValue.name[0])
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `${params.inputValue}`,
          });
        }

        return filtered;
      }}
      id="free-solo-with-text-demo"

      options={this.state.posts}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return  option.name[0];
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        console.log(option)

           return option.name[0];
      }}

      renderOption={(option) => (
        <Grid container alignItems="center">
        <Grid item xs>
            <span key={option.id}  style={{fontSize:15, fontWeight: option.highlight ? 700 : 400 }}>
              {option.name}
            </span>
        </Grid>
      </Grid>
      
      )}      
      renderInput={(params) => (
        <div>
        <div className="container">

        <TextField {...params}
        classes={{
          root: classes.inputRoot
          }}
         label="search in songs,..."
          variant="outlined" 
          InputProps={{ ...params.InputProps, type: 'search' }}
          InputLabelProps={{ style: {fontFamily:'Open Sans', fontSize: 13}}} 
          onChange={this.handlechange}
          />
              </div>
       
            </div>
        )}
    />
        </div>
    </div>
  );
  
        }
}
export default withStyles(useStyles)(SearchAppBar);

