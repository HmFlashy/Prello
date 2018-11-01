import './Error401Page.css'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'

class Error404Page extends Component {

    constructor(){
        super()
        this.goToLogin = this.goToLogin.bind(this)
    }

    goToLogin(){
        this.props.history.push({
           pathname: '/login',
           redirect: this.props.location
        })
    }

    render(){
        return ( 
            <div className="error-401">
                <div className="error-401-content">
                    <h1>ERROR 401</h1>
                    <h2>You are unauthorized to access this resource</h2>
                    <a onClick={this.goToLogin}>Go back to login page</a>
                </div>
            </div>
        )
    }
}

export default withRouter(Error404Page)