import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Card.css'
class Card extends Component {

    constructor(props){
        super(props)
        this.changeCardName = this.changeCardName.bind(this)
    }

    changeCardName(name) {

    }

    render(){
        return (
            <div className="card">
                MDR
            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    dispatch => ({
        changeCardName: () => {
            dispatch(changeCardName())
        }
    })
)(Card);