import React, { Component } from 'react';
import './Board.css'
import ListContainer from '../../../../containers/ListContainers/ListContainer';
import NewListContainer from '../../../../containers/ListContainers/NewListContainer';
import CardDetailContainer from '../../../../containers/CardContainers/CardDetailContainer'
import { List, Button, Modal } from 'semantic-ui-react'

class Board extends Component {

    constructor(){
        super()
    }

    componentWillMount(){
        this.props.subscribe()
        this.props.fetchBoard(this.props.match.params.boardId)
        this.setState = {
            cardId: this.props.match.params.cardId
        }
        console.log(this.props.match.params)
    }


    render(){
        console.log(this.props)
        return (
            <List className='board'>
                { this.props.board.lists.map(listId => (
                    <List.Item className='no-padding-top'><ListContainer key={listId} listId={listId}/></List.Item>
                )) }
                <List.Item className='no-padding-top'><NewListContainer /></List.Item>
                <Button onClick={() => {
                    this.props.history.push(`/boards/${this.props.board._id}/card/5bcd8635e789ec5a229c29b3`)
                    this.props.displayCardModal('5bcd8635e789ec5a229c29b3')
                }}/>
                <Modal 
                    open={this.props.currentCard != null}
                    onClose={() => this.props.closeCardModal()}
                    >
                    <CardDetailContainer key={this.props.currentCard} cardId={this.props.currentCard}></CardDetailContainer>
                </Modal>
            </List>

        );
    }
}

export default Board