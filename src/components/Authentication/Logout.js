import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Cookies from 'js-cookie';

const URL = '/api/auth/signout';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    onLogout = async() => {
        let session = Cookies.get('session');
        try {
            const response = await fetch( URL + '?session=' + session);
            const data = response.json();
            Cookies.set('session', undefined);
            this.setState({
                render: true
            })
        }catch{
            console.log('error occured')
        }
    }

    render() {
        if(this.state.render) {
            return <Redirect to='/profile' />
        }
        return (
            <>
            <button className='btn btn-outline-danger' onClick={this.onLogout} >Logout</button>
            </>

        )
    }
}