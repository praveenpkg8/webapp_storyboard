import React, { Component } from 'react';
import Signin from './Authentication/Signin';
import Signup from './Authentication/Signup';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: true,
            signupMessage: '',
            displayMessage: false,
        };
    }

    componentWillMount() {
    }

    handleSignin = () => {
        const { render } = this.state;
        if (!render) {
            this.setState({
                render: !render,
            });
        }
    }

    handleSignup = () => {
        const { render } = this.state;
        if (render) {
            this.setState({
                render: !render,
            });
        }
    }

    onSignup = (data) => {
        const { render } = this.state;
        if (!render) {
            this.setState({
                render: !render,
                signupMessage: data.message,
                displayMessage: true,
            });
        }
    }

    hideMessage = () => {
        this.setState({
            displayMessage: false,
        });
    }

    render() {
        const { render, displayMessage, signupMessage } = this.state;
        return (
            <>
                <div className="container">
                    { displayMessage ? (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Welcome !</strong>
                            {' '}
                            {signupMessage}
                            <button type="button" className="close" data-dismiss="alert" onClick={this.hideMessage} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    ) : <></>}
                    <br />
                    <br />

                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" onClick={this.handleSignin} className="btn btn-secondary">SignIn</button>
                        <button type="button" onClick={this.handleSignup} className="btn btn-secondary">SignUp</button>
                    </div>
                    <br />
                    <br />

                    {render ? <Signin /> : <Signup onSignup={this.onSignup} />}

                </div>

            </>
        );
    }
}
