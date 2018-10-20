import React, { Component } from 'react';
import './Board.css'
import BoardContainer from '../../../containers/BoardContainer'

class Board extends Component {

    componentWillMount(){
        this.props.subscribe()
    }

    render(){
        return (
            <div>
                MDR
            </div>
        );
    }
}

export default Board