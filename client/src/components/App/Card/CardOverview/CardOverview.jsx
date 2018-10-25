import React, { Component } from 'react';
import './CardOverview.css'
import { Segment, Container } from 'semantic-ui-react'


class CardOverview extends Component {

    constructor() {
        super()
        this.textToTextInput = this.textToTextInput.bind(this)
        this.updateCard = this.updateCard.bind(this)
        this.displayCardModal = this.displayCardModal.bind(this)
        this.state = {
            isNameUpdating: false
        }
    }

    componentDidMount() {
    }

    textToTextInput(event) {
        event.stopPropagation()
        this.setState({
            isNameUpdating: true
        })
    }

    updateCard(oldValue, data) {
        this.setState({
            isNameUpdating: false
        })
        this.props.updateCard(this.props.card._id, oldValue, data)
    }

    displayCardModal() {
        this.props.history.push(`/card/${this.props.card._id}`)
        this.props.displayCardModal(this.props.card._id)
    }

    render() {
        return (
            <Segment className='cardOverview' onClick={this.displayCardModal}>
                <p onClick={this.textToTextInput}>
                    {!this.state.isNameUpdating ? this.props.card.name : <input type="text" name="name" placeholder={this.props.card.name} onKeyPress={(event) => event.charCode === 13 ? this.updateCard({ name: this.props.card.name, _id:this.props.card._id }, { name: event.target.value, _id: this.props.card._id }) : null}></input>}
                </p>
                <span className='pos' color="textSecondary">
                    adjective
                </span>
            </Segment>
        )
    }
}

export default CardOverview
