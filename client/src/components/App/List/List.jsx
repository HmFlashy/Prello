import React, { Component } from 'react';
//import CardOverviewContainer from '../../../containers/Card/CardOverviewContainer';

class List extends Component {

    render(){
        return (
            <div>
                {this.props.list.name}
            </div>
        )
    }
}

export default List