import React, { Component } from 'react';
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';
import { Segment, Container, List, Input, Icon, Label } from 'semantic-ui-react'
import './MyList.css'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DynamicInput from '../Input/DynamicInput'

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

    addCard(event) {
        event.target.value = ''
        const posSorted = this.props.list.cards.map(card => card.pos).sort((a, b) => a - b)
        this.props.addCard(this.state.cardName, this.props.listId, posSorted.length !== 0 ? posSorted[posSorted.length - 1] + 100000 : 100000)
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
                                        <div className="list-header">
                                            <h3>
                                                <DynamicInput
                                                    type='text'
                                                    textToDisplay={this.props.list.name}
                                                    placeholder={this.props.list.name}
                                                    onValidate={(event) => this.props.updateList(this.props.list._id, { name: event.target.value })}
                                                />
                                            </h3>
                                            <Label color="olive" className="list-card-nb">{this.props.list.cards.filter(card => !card.isArchived).length}</Label>
                                            <div className="archive_list">
                                                <Label className="list-card-nb" color="red"
                                                    onClick={() => this.props.updateList(this.props.list._id, { isArchived: true })}
                                                ><Icon className="iconArchive" name="archive"></Icon></Label>
                                            </div>
                                        </div>
                                        <Container className='items'>
                                            <List >
                                                {this.props.list.cards.sort((a, b) => a.pos - b.pos).map(card => (
                                                    !card.isArchived ? <List.Item key={card._id} ><CardOverviewContainer key={card._id} cardId={card._id} fullLabelDisplay={this.props.fullLabelDisplay} changeFullLabelDisplay={() => this.props.changeFullLabelDisplay()} /></List.Item> :
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
                                                if (event.target.value !== "") {
                                                    return event.keyCode === 13 ? this.addCard(event) : null
                                                }
                                                else console.log("Please fill the card name")
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