import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import Cookies from 'js-cookie';


const URL = '/api/auth/signin';


export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: '',
            redirect: false,
            errorMessage: false,
            error: '',
            reset: false,
        };
    }

    handleChange = (event) => {
        const { target } = event;
        const { name } = target;
        const { value } = target;
        this.setState({
            [name]: value,
        });
    }

    hideErrorMessage = () => {
        this.setState({
            errorMessage: false,
        });
    }

    onReset = () => {
        this.setState({
            reset: true,
        });
    }

    onSignin = async () => {
        const { mail, password } = this.state;
        const setting = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail,
                password,
            }),
        };
        const response = await fetch(URL, setting);
        const data = await response.json();
        console.log(data)
        this.setState({
            mail: '',
            password: '',
        });

        if (response.status === 200) {
            Cookies.set('session', data.session);
            this.setState({ redirect: true });
        } else if (response.status === 400) {
            this.setState({
                errorMessage: true,
                error: data.message,
            });
        }
        return null;
    }

    render() {
        const {
            redirect, mail, password, errorMessage, error, reset,
        } = this.state;
        if (redirect) {
            return <Redirect to="/" />;
        }
        if (reset) {
            return <Redirect to="/reset" />;
        }
        return (
            <>
                { errorMessage ? (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Warning!</strong>
                        {' '}
                        {error}
                        <button type="button" className="close" data-dismiss="alert" onClick={this.hideErrorMessage} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                ) : <></>}
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
                                className="form-control"
                                value={mail}
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
                                className="form-control"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-info" onClick={this.onSignin}>Login</button>
                        <button type="button" onClick={this.onReset} className="btn btn-link">Forgot Password</button>


                        <h4>
                            Login with
                            <GoogleAuth />
                        </h4>
                    </div>
                </div>
            </>
        );
    }
}
