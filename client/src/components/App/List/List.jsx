import React, { Component } from 'react';
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';
import { Segment, Container, List, Input, Grid } from 'semantic-ui-react'
import './List.css'
import { Droppable, Draggable } from 'react-beautiful-dnd';

class MyList extends Component {

    constructor() {
        super()
        this.addCard = this.addCard.bind(this)
        this.changeCardName = this.changeCardName.bind(this)
        this.state = {
            cardName: ''
        }
    }

    changeCardName(cardName) {
        this.setState({
            cardName: cardName
        })
    }

    addCard() {
        const posSorted = this.props.list.cards.map(card => card.pos).sort((a, b) => a - b)
        this.props.addCard(this.state.cardName, this.props.listId, posSorted[posSorted.length - 1] + 100000)
    }

    render() {
        return (
            <Draggable className="myDiv" draggableId={this.props.list._id} index={this.props.list.pos}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="lists" >
                        <Droppable droppableId={this.props.list._id} type="LIST">
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="myDiv">

                                    <Segment className='myList' >
                                        <h3>{this.props.list.name}</h3>
                                        <Container className='items'>
                                            <List >
                                                {this.props.list.cards.sort((a, b) => a.pos - b.pos).map(card => (
                                                    !card.isArchived ? <List.Item key={card._id} ><CardOverviewContainer key={card._id} cardId={card._id} /></List.Item> :
                                                        null
                                                ))}

                                                {provided.placeholder}
                                            </List>
                                        </Container>
                                        <Input
                                            type="text"
                                            placeholder="Create a new card"
                                            onChange={(event) => this.changeCardName(event.target.value)}
                                            onKeyDown={(event) => {
                                                return event.keyCode === 13 ? this.addCard() || (event.target.value = '') : null
                                            }
                                            } />
                                    </Segment>
                                </div>

                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default MyList