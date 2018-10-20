import React, { Component } from 'react';
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';

class List extends Component {

    render(){
        return (
            <div>
                {this.props.list.name}
                {this.props.list.cards.map(card => (
                        <CardOverviewContainer key={card._id} card={card}/>
                ))}
                <input onKeyDown={(event) => event.keyCode === 13 ? this.props.addCard(event.target.value, this.props.list._id) : null }></input>
            </div>
        )
    }
}

export default List