import React, { Component } from 'react';
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';
import { Segment, Container, List, Input, Grid } from 'semantic-ui-react'
import './List.css'
import { Droppable } from 'react-beautiful-dnd';

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
        this.props.addCard(this.state.cardName, this.props.listId)
    }

    render() {
        return (
            <Droppable droppableId={this.props.list._id} type="LIST">
                {(provided, snapshot) => (
                    <div {...provided.droppableProps}
                        ref={provided.innerRef}>
                        <Segment className='myList' >
                            <h3>{this.props.list.name}</h3>
                            <Container className='items'>
                                <List >
                                    {this.props.list.cards.map(cardId => (
                                        <List.Item key={cardId} ><CardOverviewContainer key={cardId} cardId={cardId} /></List.Item>
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
        )
    }
}

export default MyList