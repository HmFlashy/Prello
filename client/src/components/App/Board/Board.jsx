import React, { Component } from 'react';
import './Board.css'
import '../../../containers/CardContainers/CardOverviewContainer'
import ListContainer from '../../../containers/ListContainer';
import { Segment, Container, List } from 'semantic-ui-react'

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
            </List>
        );
    }
}

export default Board