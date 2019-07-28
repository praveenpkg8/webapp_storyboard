import React, { Component } from 'react'
import Signin from './Authentication/Signin';
import Signup from './Authentication/Signup';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: true
        }
    }

    handleSignin = () => {
        let val = this.state.render
        if (!val) {
            this.setState({
                render: !val
            })
        }
        
    }
    componentWillMount(){
    }
    handleSignup = () => {
        let val = this.state.render
        if (val) {
            this.setState({
                render: !val
            })
        }
        
    }

    render() {
        return (
            <>
            <div className='container'>
            <br/>
                <br/>

                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={this.handleSignin} className="btn btn-secondary">SignIn</button>
                    <button type="button" onClick={this.handleSignup} className="btn btn-secondary">SignUp</button>
                </div>
                <br/>
                <br/>

                {this.state.render?<Signin /> :<Signup />} 

            </div>

            </>
        )
    }
}
