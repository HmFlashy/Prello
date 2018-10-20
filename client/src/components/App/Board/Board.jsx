import React, { Component } from 'react';
import './Board.css'
import '../../../containers/CardContainers/CardOverviewContainer'
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';

class Board extends Component {

    componentWillMount(){
        this.props.subscribe()
    }

    render(){
        return (
            <CardOverviewContainer></CardOverviewContainer>
        );
    }
}

export default Board