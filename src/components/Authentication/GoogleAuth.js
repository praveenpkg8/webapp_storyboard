import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';


export default class GoogleAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect:  false
        }
    }
    googeOAuth = async() => {
        this.setState({
            redirect: true
        })
    }
    render() {
        if (this.state.redirect)
        return <Redirect to='http://localhost:8080/api/auth/google' />
        return (
            <>
            {/* <button onClick={this.googeOAuth} className='btn'>Googe Signup</button> */}
            <a href='http://localhost:8080/api/auth/google' className='btn btn-outline-warning'> Google</a>
            </>
        )
    }
}
