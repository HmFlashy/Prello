import React, { Component } from 'react';
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';
import { Segment, Container, List } from 'semantic-ui-react'
import './List.css'

class MyList extends Component {

    render(){
        return (
            <Segment className='myList'>
                {this.props.list.name}
                <Container className='items'>
                    <List >
                        {this.props.list.cards.map(cardId => (
                                <List.Item><CardOverviewContainer key={cardId} cardId={cardId}/></List.Item>
                        ))}
                    </List>
                </Container>
                <input onKeyDown={(event) => event.keyCode === 13 ? this.props.addCard(event.target.value, this.props.list._id) : null }></input>
            </Segment>
        )
    }
}

export default MyList