import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const URL = '/api/auth/signup';


export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mail: '',
            password: '',
        }
    }

    handleChange = (event) => {
        var target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSignup = async() => {
        const setting = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                name: this.state.name,
                mail: this.state.mail,
                password: this.state.password,
              })
            }
        const user = await fetch(URL, setting)
        .then(response => response.json())
        this.setState({
            name: '',
            mail: '',
            password: '',
        })
        console.log(user)
        return <Redirect to='/signin' />
    }

    render() {
        return (
            <>
            <div className="card w-50">
                <h5 className="card-header">SignUp</h5>
                <div className="card-body">
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Name</span>
                    </div>
                    <input 
                    name='name'
                    type="text"
                    className='form-control'
                    value={this.state.name}
                    onChange={this.handleChange}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Mail Id</span>
                    </div>
                    <input 
                    name='mail'
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

                    <button className='btn btn-outline-info' onClick={this.onSignup}>Signup</button>
                    <h4>Sign Up with <GoogleAuth /></h4>   
                </div>
            </div>
            </>
        );
    }
}