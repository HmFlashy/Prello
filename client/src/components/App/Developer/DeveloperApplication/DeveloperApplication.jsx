import React, { Component } from 'react'
import "./DeveloperApplication.css"

class DeveloperApplication extends Component {

    render(){
        return(
            <div className="do-application-item">
                <h2>{this.props.application.name}</h2>
            </div>
        )
    }

}

export default DeveloperApplication