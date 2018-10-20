import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Card.css'
import { changeCardNameAction, actionGetCard, failedActionGetCard } from '../../../redux/actions/CardActions'
import cardServices from '../../../services/CardServices'

class Card extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
    }

    render(){
        return (
            <div className="card">
                <button onClick={()=>this.props.getCard("5bc585cdf2433010c789a2d8")}>Test redux action</button>
                <pre>
                    {
                        JSON.stringify(this.props.card) 
                        
                    }
                </pre>
            </div>
        )
    }
}

export default connect(
    state => ({
        card: state.cardReducer.card,
        error: state.cardReducer.error
    }),
    dispatch => {
        return {
            changeCardName: (name) => {
                dispatch(changeCardNameAction(name))
            },
            getCard: async (id) => {
                try {
                    let card = await cardServices.getCard(id);
                    dispatch(actionGetCard(card))
                } catch(e) {
                    dispatch(failedActionGetCard(e))
                }
            }
        }
    }
)(Card);