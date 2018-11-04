import React, { Component } from 'react';
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';
import { Segment, Container, List, Input, Grid } from 'semantic-ui-react'
import './List.css'

class MyList extends Component {

    constructor(){
        super()
        this.addCard = this.addCard.bind(this)
        this.state = {
            cardName: '',
            listId: this.props.list._id
        }
    }

    changeCardName(cardName){
        this.setState({
            cardName: cardName
        })
    }

    addCard(list) {
        this.props.addCard(this.state.cardName, this.state.listId)
        this.changeCardName('')
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
                    onChange={(event) => this.changeCardName(event.target.value)} 
                    onKeyDown={(event) => {
                        event.target.value = ''
                        return event.keyCode === 13 ? this.addCard() : null
                        }
                    }></Input>
            </Segment>
        )
    }
}

export default MyList