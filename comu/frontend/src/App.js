import { BrowserRouter as Router, Switch, Route ,Redirect} from "react-router-dom";
import React, { useState } from "react";
import Homepage from "./homepage";
import playlistPage from "./playlistPage";
import Playlist from "./playlist";
import Navbar from "./navbar";
import Nav from "./Nav";
import "./welcomepage.js";
import Welcome from "./welcomepage";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Bottom from "./bottombar";
import Search from "./search";
import { CookiesProvider } from "react-cookie";
import User from "./Profile/User";
import Player from './player';
import './app.css';
import Cookie from 'js-cookie';
import Whole from './wholeplaylists'
function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const checkAuth = () => {
    try {
      // To be replaced with your condition
      if (Cookie.get('token')!==undefined) {
        setAuthLoading(true)
        return true;
      }

    } catch (e) {
      setAuthLoading(false)
      return false;
    }
    setAuthLoading(false)

    return false;
  }
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/' }} />
        )
    )} />
  )
  return (
    <div>
      <CookiesProvider>
        <Router forceRefresh={true}>
          <div>
            <div>
              <Switch>
                <Route path="/" exact component={Welcome}>
                </Route>
                {Cookie.get('token')!==undefined?
                <div>
                <Route path="/user/:id" exact component={User}>
                <Nav />
                {/* <Player/> */}
                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>
                <Route path="/user/:username/:id" exact component={Homepage}>
                <Nav />
                {/* <Player/> */}
                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>
                <Route path="/user" exact component={User}>
                <Nav />
                {/* <Player/> */}
                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>
                <Route path="/search" exact component={Search}>
                <Nav />
                {/* <Player/> */}
                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>
                <Route  path="/homepage" exact component={Homepage} >
                <Nav />
                <div className="bottombar">
                {/* <Player/> */}
                </div>               
                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>
                <Route  path="/homepage/:usename/:id" exact component={Homepage} >
                <Nav />
                {/* <Player/> */}
                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>
                <Route path="/createplaylist" exact component={Playlist}>
                <Nav />
                {/* <Player/> */}

                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>
                <Route path="/playlistPage" exact component={Whole}>
                <Nav />
                {/* <Player/> */}

                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>   
                <Route path="/playlistPage/:id/:username" exact component={playlistPage} >
                <Nav />
                {/* <Player/> */}

                <div className="bottombar">
                <Bottom />
                </div>               
                <div className="navbar">
                <Navbar /> 
                </div>
                </Route>   
                </div>
                :
                  <Redirect to="/">
                  </Redirect>
                }
              </Switch>
            </div>
          </div>
        </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;
