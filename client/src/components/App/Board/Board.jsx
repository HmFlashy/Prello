import React, { Component } from 'react';
import './Board.css'
import '../../../containers/CardContainers/CardOverviewContainer'
import ListContainer from '../../../containers/ListContainer';

class Board extends Component {

    componentWillMount(){
        this.props.subscribe()
        this.props.fetchBoard(this.props.match.params.boardId)
    }

    render(){
        return (
            <div>
                { this.props.board.lists.map(listId => (
                    <ListContainer key={listId} listId={listId}/>
                )) }
            </div>
        );
    }
}

export default Board