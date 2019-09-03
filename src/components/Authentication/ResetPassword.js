import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


const URL = '/api/auth/forgot-password';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            redirect: false,
        };
    }

    handleChange = (event) => {
        const { target } = event;
        const { name, value } = target;
        this.setState({
            [name]: value,
        });
    }


    onReset = async () => {
        const { mail } = this.state;
        this.setState({
            mail: '',
        });
        const setting = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail,
            }),
        };
        const response = await fetch(URL, setting);
        if (response.status === 200) {
            this.setState({
                redirect: true,
            });
        }
    }

    render() {
        const { redirect, mail } = this.state;
        if (redirect) {
            return <Redirect to="/landing-page" />;
        }
        return (
            <>
                <div className="card w-50">
                    <div className="card-header">
                        Reset Password
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Enter mail to send reset link</h5>
                        <input
                            name="mail"
                            type="mail"
                            placeholder="mails"
                            className="form-control"
                            value={mail}
                            onChange={this.handleChange}
                        />
                        <button type="submit" onClick={this.onReset} className="btn btn-primary">Send Request</button>
                    </div>
                </div>
            </>
        );
    }
}

export default ResetPassword;
