import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoogleAuth from './GoogleAuth';


const URL = '/api/auth/signup';

class Signup extends Component {
    static defaultProps = {
        onSignup: '',
    };

    constructor(props) {
        super(props);
        const { onSignup } = this.props;
        this.state = {
            name: '',
            mail: '',
            password: '',
            errorMessage: false,
            error: '',
            render: onSignup,
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

    onSignup = async () => {
        const {
            name, mail, password, render,
        } = this.state;
        this.setState({
            name: '',
            mail: '',
            password: '',
        });
        const setting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name,
                mail,
                password,
            }),
        };
        try {
            const response = await fetch(URL, setting);
            const data = await response.json();
            if (response.status === 406) {
                this.setState({
                    errorMessage: true,
                    error: data.message,
                });
            } else if (response.status === 201) {
                render(data);
            }
        } catch {
            // Error
        }


        return <Redirect to="/signin" />;
    }


    render() {
        const {
            name, mail, password, errorMessage, error,
        } = this.state;
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
                    <h5 className="card-header">SignUp</h5>
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Name</span>
                            </div>
                            <input
                                name="name"
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={this.handleChange}
                            />
                        </div>
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
                        <button type="button" className="btn btn-outline-info" onClick={this.onSignup}>Signup</button>
                        <h4>
                        Sign Up with
                            <GoogleAuth />
                        </h4>
                    </div>
                </div>
            </>
        );
    }
}

Signup.propTypes = {
    onSignup: PropTypes.func,
};

export default Signup;
