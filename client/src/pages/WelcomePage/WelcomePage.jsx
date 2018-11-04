import './WelcomePage.css'
import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';

class WelcomePage extends Component {

    render(){
        return (
            <div className="welcome-page">
                <div className="welcome-page-header">
                    <div className="button-wrapper">
                        <Button onClick={() => this.props.history.push("/login")} color="teal">Sign in</Button>
                        <Button onClick={() => this.props.history.push("/register")} color="grey">Sign up</Button>
                    </div>
                    <div className="welcome-page-content">

                    </div>
                </div>
            </div>
        )
    }
}

export default WelcomePage