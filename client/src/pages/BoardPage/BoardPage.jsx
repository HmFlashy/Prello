import './BoardPage.css'
import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import Header from "../../containers/HeaderContainer";
import BoardContainer from '../../containers/BoardContainer/BoardContainer';
import ErrorLayoutContainer from '../../containers/ErrorLayoutContainer';

class BoardPage extends Component {

    render(){
        return (
            <ErrorLayoutContainer>
                <Header />
                <BoardContainer boardId={this.props.match.params.boardId} cardId={this.props.match.params.cardId}/>
            </ErrorLayoutContainer>
        )
    }
}

export default BoardPage