import './BoardPage.css'
import React, { Component } from 'react'
import BoardContainer from '../../containers/BoardContainer/BoardContainer';
import ErrorLayoutContainer from '../../containers/ErrorLayoutContainer';
import SecureLayoutContainer from '../../containers/SecureLayoutContainer';
import HeaderLayout from '../../components/App/Layout/HeaderLayout';

class BoardPage extends Component {

    render(){
        return (
            <SecureLayoutContainer>
                <ErrorLayoutContainer>
                    <HeaderLayout>
                        <BoardContainer boardId={this.props.match.params.boardId} cardId={this.props.match.params.cardId}/>
                    </HeaderLayout>
                </ErrorLayoutContainer>
            </SecureLayoutContainer>
        )
    }
}

export default BoardPage