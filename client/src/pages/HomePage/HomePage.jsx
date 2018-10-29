import './HomePage.css'
import React, { Component } from 'react'
import Header from "../../containers/HeaderContainer";
import ListBoardContainer from '../../containers/BoardContainer/ListBoardContainer'

class HomePage extends Component {

    constructor(){
        super()
    }

    render(){
        return (
            <div>
                <Header />
                <ListBoardContainer />
            </div>
        )
    }
}

export default HomePage