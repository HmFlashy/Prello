import './Error404Page.css'
import React, { Component } from 'react'

class Error404Page extends Component {

    render(){
        return ( 
            <div class="error-404">
                <div class="error-404-content">
                    <h1>ERROR 404</h1>
                    <h2>The resource asking couldn't be found</h2>
                </div>
            </div>
        )
    }
}

export default Error404Page