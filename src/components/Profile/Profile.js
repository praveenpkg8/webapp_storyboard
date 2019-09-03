import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Cookies from 'js-cookie';

import Story from './Story/Story';
import Button from './Button';

const URL = '/api/auth';


function Loading() {
    return (
        <>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </>
    );
}


function User(props) {
    const { userDetials } = props;
    return (
        <>
            <h1>{userDetials.name}</h1>
            <h2>Welcome Aboard ....!!!</h2>
        </>
    );
}

User.defaultProps = {
    userDetials: {},
};

User.propTypes = {
    userDetials: PropTypes.objectOf(PropTypes.object),
};


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            loaded: false,
            status: 0,
        };
    }

    componentWillMount() {
        this.profile();
    }

    profile = async () => {
        try {
            const data = await fetch(URL, { credentials: 'include' });
            const status = await data.status;
            const user = await data.json();
            this.setState({
                user: user.message,
                loaded: true,
                status,
            });
        } catch {
            // Do nothing
        }
    }

    render() {
        const { status, user, loaded } = this.state;
        if (Cookies.get('session') !== undefined && status === 200) {
            return (

                loaded
                    ? (
                        <>
                            <div className="container">
                                <User userDetials={user} />
                                <Button />
                                <Story user={user} />
                            </div>
                        </>
                    )
                    : <h1>Loading.........</h1>
            );
        }
        if (Cookies.get('session') === undefined || user !== '' || status === 400) {
            return <Redirect to="/landing-page" />;
        }

        return <Loading />;
    }
}
