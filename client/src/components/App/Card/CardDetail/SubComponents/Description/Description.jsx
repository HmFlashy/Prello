import React, { Component } from 'react';

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