import React, { Component } from 'react';
import './Board.css'
import ListContainer from '../../../../containers/ListContainers/ListContainer';
import NewListContainer from '../../../../containers/ListContainers/NewListContainer';
import CardDetailContainer from '../../../../containers/CardContainers/CardDetailContainer'
import { List, Modal } from 'semantic-ui-react'
import MessagesDisplayerContainer from "../../../../containers/MessageContainers/MessagesDisplayerContainer"
import BoardHeaderContainer from "./../../../../containers/BoardContainer/BoardHeaderContainer"
import { withRouter } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class Board extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullLabelDisplay: true
        }
        this.changeFullLabelDisplay = this.changeFullLabelDisplay.bind(this)
    }

    componentWillMount() {
        const cardId = this.props.cardId
        if (cardId != null) {
            this.props.fetchCard(cardId)
        } else {
            this.props.fetchBoard(this.props.boardId)
        }

        this.setState({
            cardId: this.props.cardId
        })
    }

    componentWillUnmount() {
        this.props.unsubscribe(this.props.boardId)
    }


    onDragStart = () => {
    };
    onDragUpdate = () => {
    };
    onDragEnd = (data) => {
        console.log(data)
        const findPosition = (array, index, isUp) => {
            if (array.length === 0) {
                return 100000
            }
            if (index === 0) {
                return array[0] / 2
            }
            else if (index === array.length - 1) {
                return array[array.length - 1] + 100000
            }
            else {
                return isUp ? (array[index + 1] + array[index]) / 2 : (array[index - 1] + array[index]) / 2
            }
        }
        if (data.destination && data.source) {
            if (data.type === "LIST") {
                if (data.destination.droppableId === data.source.droppableId) {
                    const cardId = data.draggableId
                    const movement = (data.source.index - data.destination.index) * -1
                    let list = this.props.lists.find(list => list._id === data.source.droppableId)
                    const sorted = list.cards.sort((a, b) => a.pos - b.pos)
                    const targetIndex = sorted.findIndex(list => list._id === data.draggableId) + movement
                    console.log(sorted)
                    this.props.moveCard(cardId, { boardId: this.props.board._id, oldListId: data.source.droppableId, newListId: data.source.droppableId, pos: findPosition(sorted.map(ele => ele.pos), targetIndex, movement > 0), _id: cardId })
                }
                else {
                    const newList = data.destination.droppableId
                    const oldList = data.source.droppableId
                    const index = data.destination.index
                    const cardId = data.draggableId
                    let list = this.props.lists.find(list => list._id === newList)

                    if (list) {
                        let pos
                        if (list.length === 0) {
                            pos = 100000
                        }
                        else {
                            let cards = list.cards.sort((a, b) => a.pos - b.pos)
                            pos = index === cards.length && index !== 0 ? cards[index - 1].pos + 100000 : ((index - 1 < 0 ? 0 : cards[index - 1].pos) + (cards[index] ? cards[index].pos : 100000)) / 2
                        }
                        this.props.moveCard(cardId, { boardId: this.props.board._id, oldListId: oldList, newListId: newList, pos, _id: cardId })
                    }
                }
            }
            else if (data.type === "BOARD") {
                const movement = (data.source.index - data.destination.index) * -1
                const sorted = this.props.lists.sort((a, b) => a.pos - b.pos)
                const targetIndex = sorted.findIndex(list => list._id === data.draggableId) + movement
                this.props.moveList(data.draggableId, findPosition(sorted.map(ele => ele.pos), targetIndex, movement > 0))
            }
        }
    };

    changeFullLabelDisplay() {
        console.log(this)
        this.setState({ fullLabelDisplay: !this.state.fullLabelDisplay })
    }

    render() {
        return (
            <div className="board">
                <div id="bg">
                    <img src="http://hdwpro.com/wp-content/uploads/2016/03/1080p-Background-Desktop.jpg" style={{ width: '100%', height: '100%' }} alt="" />
                </div>
                <BoardHeaderContainer 
                    board={this.props.board}
                    newLabel={(newLabelName, newLabelColor) => this.props.onNewLabel(this.props.board._id, newLabelName, newLabelColor)}
                    deleteLabel={(labelId) => this.props.onDeleteLabel(this.props.board._id, labelId)}
                    />
                <DragDropContext
                    onDragStart={this.onDragStart}
                    onDragUpdate={this.onDragUpdate}
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId={this.props.board._id} type="BOARD" direction='horizontal'>
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="myLists">
                                <List className='lists'>
                                    {this.props.board.lists.sort((a, b) => a.pos - b.pos).map(list => (
                                        <List.Item key={list._id} className='no-padding-top'><ListContainer key={list._id} listId={list._id} fullLabelDisplay={this.state.fullLabelDisplay} changeFullLabelDisplay={() => this.changeFullLabelDisplay()} /></List.Item>
                                    ))}
                                    <List.Item className='no-padding-top'><NewListContainer /></List.Item>
                                </List>
                            </div>
                        )}
                    </Droppable>
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
            </div >
        );
    }
}

export default withRouter(Board)