import React, { Component } from 'react';
import './Board.css'
import '../../../containers/CardContainers/CardOverviewContainer'
import CardOverviewContainer from '../../../containers/CardContainers/CardOverviewContainer';

class Board extends Component {

    componentWillMount(){
        this.props.subscribe()
    }

    render(){
        return (
            <div>
                <li>
                    {this.props.cards.map(card => (
                            <CardOverviewContainer key={card._id} card={card}/>
                    ))}
                </li>
                <input onKeyDown={(event) => event.keyCode === 13 ? this.props.addCard(event.target.value) : null }></input>
            </div>
        );
    }
}

export default Board