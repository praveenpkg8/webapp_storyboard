import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Cookies from 'js-cookie';

const URL = '/api/auth/signout';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
        };
    }

    onLogout = async () => {
        const session = Cookies.get('session');
        try {
            await fetch(`${URL}?session=${session}`);
            Cookies.set('session', undefined);
            this.setState({
                render: true,
            });
        } catch {
        // Error occured
        }
    }

    render() {
        const { render } = this.state;
        if (render) {
            return <Redirect to="/landing-page" />;
        }
        return (
            <>
                <button type="button" className="btn btn-outline-danger" onClick={this.onLogout}>Logout</button>
            </>
        );
    }
}
