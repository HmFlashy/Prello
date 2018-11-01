import './Error401Page.css'
import React, { Component } from 'react'

class Error404Page extends Component {

    render(){
        return ( 
            <div class="error-401">
                <div class="error-401-content">
                    <h1>ERROR 401</h1>
                    <h2>You are unauthorized to access this resource</h2>
                </div>
            </div>
        )
    }
}

export default Error404Page