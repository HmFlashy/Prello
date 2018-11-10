import React, { Component } from 'react'
import "./NewDeveloperApplication.css"
import DynamicInput from '../../Input';

class DeveloperApplication extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        return(
            <div className="do-application-item">
                <DynamicInput onValidate={this.props.addApplication} maxLength="24"  textToDisplay={<h2>+</h2>} />
            </div>
        )
    }

}

export default DeveloperApplication