import './BoardPage.css'
import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import Header from "../../containers/HeaderContainer";
import BoardContainer from '../../containers/BoardContainer/BoardContainer';

class BoardPage extends Component {

    constructor(){
        super()
    }

    render(){
        return (
            <div>
                <Header />
                <BoardContainer boardId={this.props.match.params.boardId} cardId={this.props.match.params.cardId}/>
            </div>
        )
    }
}

export default BoardPage