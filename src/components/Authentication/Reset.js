import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';


const URL = '/api/auth/reset-password';

class Reset extends Component {
    static defaultProps = {
        match: {},
    };

    constructor(props) {
        super(props);
        const { match } = this.props;
        this.state = {
            password: '',
            confirmPassword: '',
            slug: match.params.id,
            error: false,
            errorMessage: '',
            redirect: false,
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

    onClose = () => {
        this.setState({
            error: false,
        });
    }


    onReset = async () => {
        const { password, confirmPassword, slug } = this.state;
        this.setState({
            password: '',
            confirmPassword: '',
        });
        const setting = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                password,
                slug,
            }),
        };
        try {
            if (password === confirmPassword) {
                const response = await fetch(URL, setting);
                const data = await response.json();
                if (response.status === 400) {
                    this.setState({
                        error: true,
                        errorMessage: data.message,
                    });
                } else if (response.status === 202) {
                    this.setState({
                        redirect: true,
                    });
                }
            } else {
                this.setState({
                    error: true,
                    errorMessage: 'Password did not match',
                });
            }
        } catch {
            // Error
        }
    }


    render() {
        const {
            error, errorMessage, password, confirmPassword, redirect,
        } = this.state;
        if (redirect) {
            return <Redirect to="/landing-page" />;
        }
        return (
            <>
                <div className="card w-50">
                    { error ? (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Warning!</strong>
                            {' '}
                            {errorMessage}
                            <button type="button" className="close" data-dismiss="alert" onClick={this.onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    ) : <></>}
                    <div className="card-header">
                        Reset Password
                    </div>
                    <div className="card-body">
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">password</span>
                            </div>
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-sm">confirm password</span>
                            </div>
                            <input
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                value={confirmPassword}
                                onChange={this.handleChange}
                            />
                        </div>
                        <button className="btn btn-outline-primary" onClick={this.onReset} type="submit">Reset</button>
                    </div>
                </div>
            </>
        );
    }
}


Reset.propTypes = {
    match: PropTypes.objectOf(PropTypes.object),
};

export default Reset;
