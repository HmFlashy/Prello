import React, { Component } from 'react';
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';
import { Segment, Container, List, Input, Grid } from 'semantic-ui-react'
import './List.css'

class MyList extends Component {

    constructor(){
        super()
        this.addCard = this.addCard.bind(this)
        this.changeCardName = this.changeCardName.bind(this)
        this.state = {
            cardName: ''
        }
    }

    changeCardName(cardName){
        this.setState({
            cardName: cardName
        })
    }

    addCard() {
        this.props.addCard(this.state.cardName, this.props.listId)
    }

    render() {
        return (
            <Segment className='myList'>
                <h3>{this.props.list.name}</h3>
                <Container className='items'>
                    <List >
                        {this.props.list.cards.map(cardId => (
                            <List.Item key={cardId} ><CardOverviewContainer key={cardId} cardId={cardId} /></List.Item>
                        ))}
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
        )
    }
}

export default MyList