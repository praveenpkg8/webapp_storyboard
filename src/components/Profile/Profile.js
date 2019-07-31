import React, { Component } from 'react';
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


class User extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user_detials: props.user,
        }
        
    }

    render() {
        return (
            <>
            <h1>{this.state.user_detials.name}</h1>
            <h2>Welcome Aboard ....!!!</h2>
            </>
        )
    }
}

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : '',
            loaded: false,
            story: '', 
            render: true,
            status: 0

        }
    }

    profile = async() => {
        const data = await fetch(URL,{credentials: 'include'});
        const user = await data.json();
        const status = await data.status;
        this.setState({
            user : user.message,
            loaded: true,
            status: status
        })
    }
    
    componentWillMount() {
        this.profile();
    }

    render() {
        if (Cookies.get('session') !== undefined && this.state.status === 200) {
            return (
                
                this.state.loaded ? 
                <>
                <div className='container'>
                <User user={this.state.user} />
                <Button />
                <Story user={this.state.user} />
                </div>
                </>
                :
                <h1>Loading.........</h1>
                )
            }
            else if (Cookies.get('session') === undefined || this.state.user !== '' || this.state.status === 400 ) {
                return <Redirect to='/landing-page' />
            }
            else{
                return <Loading />
            }   
    
    }
}