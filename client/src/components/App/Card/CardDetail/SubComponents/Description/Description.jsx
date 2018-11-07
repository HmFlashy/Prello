import React, { Component } from 'react';
import './Description.css'
import { Icon } from 'semantic-ui-react'

class CardDescription extends Component {
 
    render(){
        return(
            <div>
                <div>
                    <p onClick={this.props.descToInput}>
                        {this.props.description}
                    </p>
                </div>
            </div>
        )
    }
}

export default CardDescription