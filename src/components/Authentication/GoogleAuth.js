import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const ProductionURL = 'https://full-services.appspot.com';
const URL = `${ProductionURL}/api/auth/google`;
export default class GoogleAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    googeOAuth = async () => {
        this.setState({
            redirect: true,
        });
    }


    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={`${ProductionURL}/api/auth/google`} />;
        }
        return (
            <>
                <a href={URL} className="btn btn-outline-warning"> Google</a>
            </>
        );
    }
}
