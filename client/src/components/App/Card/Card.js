import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Card.css'
import { changeCardNameAction } from '../../../redux/actions/cardActions'

class Card extends Component {

    constructor(props){
        super(props)
        this.changeCardName = this.changeCardName.bind(this)
    }

    changeCardName(name) {
        this.props.changeCardNameAction(name)
    }

    render(){
        return (
            <div className="card">
                <button onClick={this.changeCardName}>Test redux action</button>
                <pre>
                    {
                        JSON.stringify(this.props)
                    }
                </pre>
            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    dispatch => {
        return {
            changeCardNameAction: (name) => {
                dispatch(changeCardNameAction(name))
            }
        }
    }
)(Card);