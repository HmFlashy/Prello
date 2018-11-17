import React, { Component } from 'react';

class Description extends Component {
 
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

export default Description