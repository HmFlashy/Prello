import './Error403Page.css'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'

class Error403Page extends Component {

    constructor(){
        super()
    }

    render(){
        return ( 
            <div className="error-403">
                <div className="error-403-content">
                    <h1>ERROR 403</h1>
                    <h2>Forbidden</h2>
                </div>
            </div>
        )
    }
}

export default withRouter(Error403Page)