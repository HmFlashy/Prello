import './HomePage.css'
import React, { Component } from 'react'
import Header from "../../containers/HeaderContainer";
import ListBoardContainer from '../../containers/BoardContainer/ListBoardsContainer'
import SecureLayoutContainer from '../../containers/SecureLayoutContainer';

class HomePage extends Component {

    render(){
        return (
            <SecureLayoutContainer>
                <Header />
                <ListBoardContainer />
            </SecureLayoutContainer>
        )
    }
}

export default HomePage