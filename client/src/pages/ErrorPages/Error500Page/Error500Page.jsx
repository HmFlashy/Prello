import './Error500Page.css'
import React, { Component } from 'react'

class Error500Page extends Component {

    render(){
        return ( 
            <div className="error-500">
                <div className="error-500-content">
                    <h1>ERROR 500</h1>
                    <h2>Server error, retry later</h2>
                </div>
            </div>
        )
    }
}

export default Error500Page