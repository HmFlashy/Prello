import React, { Component } from 'react';
import './Board.css'
import ListContainer from '../../../../containers/ListContainers/ListContainer';
import NewListContainer from '../../../../containers/ListContainers/NewListContainer';
import { List } from 'semantic-ui-react'

class Board extends Component {

    componentWillMount(){
        this.props.subscribe()
        this.props.fetchBoard(this.props.match.params.boardId)
    }

    render(){
        return (
            <List className='board'>
                { this.props.board.lists.map(listId => (
                    <List.Item className='no-padding-top'><ListContainer key={listId} listId={listId}/></List.Item>
                )) }
                <List.Item className='no-padding-top'><NewListContainer /></List.Item>
            </List>
        );
    }
}

export default Board