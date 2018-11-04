import './Error400Page.css'
import React, { Component } from 'react'

class Error404Page extends Component {

    render(){
        return ( 
            <div className="error-400">
                <div className="error-400-content">
                    <h1>ERROR 400</h1>
                    <h2>Bad request, the request is malformed</h2>
                </div>
            </div>
        )
    }
}

export default Error404Page