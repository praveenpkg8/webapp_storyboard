import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import Signup from '../components/Authentication/Signup';
import Signin from '../components/Authentication/Signin';
import LandingPage from '../components/LandingPage';
import Profile from '../components/Profile/Profile';


function Child({ match }) {
    Cookies.set('session', match.params.id)
    return (
          <>
          <Redirect to='' />
          </>
      );
      }

function RouteConfig() {
    return (
        <>
        <Router>
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/' exact component={Profile} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/landing-page' excat component={LandingPage} />
            <Route path="/sign/:id" component={Child}/>
        </Router>
        </>
    )
}

export default RouteConfig;