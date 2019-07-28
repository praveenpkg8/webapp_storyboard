import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';


const URL = "/api/auth/signin";

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            redirect: false,
        }
    }

    handleChange = (event) => {
        var target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
          });
    }

    onSignin = async() => {
        const setting = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                mail: this.state.mail,
                password: this.state.password
              })
        }
        const data = await fetch(URL, setting)
        .then((response) => response.json().then(data => ({
            data: data,
            status: response.status
        })))
        this.setState({
            mail: '',
            password: ''
        })

        if(data.status === 200) {
            document.cookie = "session=" + data.data.session;
            this.setState({ redirect: true})
        }
        else {
            return <Redirect to='/signin' />
        }


    }

    render () {
        if (this.state.redirect){
            return <Redirect to='/profile'/>;
        }
        return (
            <>
            <div className="card w-50">
                <h5 className="card-header">SignIn</h5>
                <div className="card-body">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Mail Id</span>
                    </div>
                    <input
                    name="mail" 
                    type="mail"
                    className='form-control'
                    value={this.state.mail}
                    onChange={this.handleChange} 
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Password</span>
                    </div>
                    <input 
                    name="password"
                    type="password"
                    className='form-control'
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                </div>

                    <button className='btn btn-outline-info' onClick={this.onSignin}>Login</button>
                    <h4>Login with <GoogleAuth /></h4>   
                </div>
            </div>
            
            

            </>
        )
    }
}