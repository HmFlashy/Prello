import React, { Component } from 'react';
import './Board.css'
import ListContainer from '../../../../containers/ListContainers/ListContainer';
import NewListContainer from '../../../../containers/ListContainers/NewListContainer';
import CardDetailContainer from '../../../../containers/CardContainers/CardDetailContainer'
import { List, Modal } from 'semantic-ui-react'
import MessagesDisplayerContainer from "../../../../containers/MessageContainers/MessagesDisplayerContainer"
import Header from "./Header"
import { withRouter } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd';

class Board extends Component {

    componentWillMount() {
        this.props.subscribe(this.props.boardId)
        const cardId = this.props.cardId
        if (cardId != null) {
            this.props.fetchCard(cardId)
        } else {
            this.props.fetchBoard(this.props.boardId)
        }

        this.setState = {
            cardId: this.props.cardId
        }
    }

    componentWillUnmount() {
        this.props.unsubscribe(this.props.boardId)
    }


    onDragStart = (data) => {
        console.log("STARTING DRAG")
        console.log(data)
    };
    onDragUpdate = (data) => {
        console.log("UPDATE DRAG")
        console.log(data)
    };
    onDragEnd = (data) => {
        console.log("END DRAG")
        console.log(data)
        if (data.destination && data.source) {
            const newList = data.destination.droppableId
            const oldList = data.source.droppableId
            const index = data.destination.index
            const cardId = data.draggableId
            console.log(`Move ${cardId} from ${oldList} to ${newList} at ${index}`)
            let list = this.props.lists.find(list => list._id == newList)

            if (list) {
                let pos = list.length == 0
                    ? 100000
                    : list.cards.sort((a, b) => a.pos - b.pos)
            }
        }
    };

    render() {
        return (
            <div className="board">
                <Header />
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >
                    <div className="lists-content">
                        <List className='lists'>
                            {this.props.board.lists.map(listId => (
                                <List.Item key={listId} className='no-padding-top'><ListContainer key={listId} listId={listId} /></List.Item>
                            ))}
                            <List.Item className='no-padding-top'><NewListContainer /></List.Item>
                        </List>
                    </div>
                </DragDropContext>
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
            </div>
        );
    }
}

export default withRouter(Board)