import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';


import LandingPage from '../components/LandingPage';
import Profile from '../components/Profile/Profile';
import Singnin from '../components/Authentication/Signin';
import Reset from '../components/Authentication/Reset';
import ResetPassword from '../components/Authentication/ResetPassword';


function Child({ match }) {
    Cookies.set('session', match.params.id);
    return (
        <>
            <Redirect to="" />
        </>
    );
}


Child.defaultProps = {
    match: '',
};

Child.propTypes = {
    match: PropTypes.string,
};


function RouteConfig() {
    return (
        <>
            <Router>
                <Route path="/" exact component={Profile} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/landing-page" exact component={LandingPage} />
                <Route path="/signin" exact component={Singnin} />
                <Route path="/sign/:id" component={Child} />
                <Route path="/reset" component={ResetPassword} />
                <Route
                    path="/reset-password/:id"
                    render={props => <Reset {...props} />}
                />

            </Router>
        </>
    );
}

export default RouteConfig;
