import React, { Component } from 'react';
import './Board.css'
import ListContainer from '../../../../containers/ListContainers/ListContainer';
import NewListContainer from '../../../../containers/ListContainers/NewListContainer';
import CardDetailContainer from '../../../../containers/CardContainers/CardDetailContainer'
import { List, Button, Modal, Segment } from 'semantic-ui-react'
import MessagesDisplayerContainer from "../../../../containers/MessageContainers/MessagesDisplayerContainer"
import Header from "./Header"

class Board extends Component {

    componentWillMount() {
        this.props.subscribe()
        const cardId = this.props.match.params.cardId
        if (cardId != null) {
            this.props.fetchCard(cardId)
        } else {
            this.props.fetchBoard(this.props.match.params.boardId)
        }

        this.setState = {
            cardId: this.props.match.params.cardId
        }
    }


    render() {
        return (
            <div className="board">
                <Header></Header>
                <List className='lists'>
                    {this.props.board.lists.map(listId => (
                        <List.Item key={listId} className='no-padding-top'><ListContainer key={listId} listId={listId} /></List.Item>
                    ))}
                    <List.Item className='no-padding-top'><NewListContainer /></List.Item>

                    <Modal
                        open={this.props.cardModal._id != null}
                        onClose={() => {
                            this.props.history.push(`/boards/${this.props.board._id}`)
                            this.props.closeCardModal()
                        }}>
                        <Modal.Content image>
                            <CardDetailContainer key={this.props.cardModal._id} cardId={this.props.cardModal._id}></CardDetailContainer>
                        </Modal.Content>
                    </Modal>
                    <MessagesDisplayerContainer />
                </List>
            </div>
        );
    }
}

export default Board