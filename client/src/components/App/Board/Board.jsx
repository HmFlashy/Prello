import React, { Component } from 'react';
import './Board.css'
import '../../../containers/CardContainers/CardOverviewContainer'
import ListContainer from '../../../containers/ListContainer';

class Board extends Component {

    componentWillMount(){
        this.props.subscribe()
    }

    render(){
        return (
            <div>
                { this.props.board.lists.map(list => (
                    <ListContainer list={list}/>
                )) }
            </div>
        );
    }
}

export default Board