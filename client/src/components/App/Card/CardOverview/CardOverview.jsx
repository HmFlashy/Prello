import React, { Component } from 'react';
import './CardOverview.css'
import { Input, Card, Icon, Ref } from 'semantic-ui-react'
import DynamicInput from '../../Input/DynamicInput'


class CardOverview extends Component {

    constructor() {
        super()
        this.textToTextInput = this.textToTextInput.bind(this)
        this.textInputToText = this.textInputToText.bind(this)
        this.updateCard = this.updateCard.bind(this)
        this.displayCardModal = this.displayCardModal.bind(this)
        this.validateNewName = this.validateNewName.bind(this)
        this.state = {
            isNameUpdating: false
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', (event) => {
            return this.node.contains(event.target) ? event.stopPropagation(): this.textInputToText()
        });
    }

    textToTextInput(event) {
        event.stopPropagation()
        this.setState({
            isNameUpdating: true
        })
    }

    textInputToText(event) {
        this.setState({
            isNameUpdating: false
        })
    }

    validateNewName(event) {
        if(event.charCode === 13)
            this.updateCard({ name: this.props.card.name, _id:this.props.card._id }, { name: event.target.value, _id: this.props.card._id })
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
            <Ref innerRef={node => this.node = node}>
                <Card className='cardOverview' onClick={this.displayCardModal}>
                    <Card.Content>
                        <Card.Header onClick={this.textToTextInput}>
                        {!this.state.isNameUpdating ? 
                            this.props.card.name : 
                            <DynamicInput type='text' placeholder={this.props.card.name} onClick={(event) => event.stopPropagation()} onKeyPress={this.validateNewName} />}
                        </Card.Header>
                        <Card.Meta><Icon disabled name='eye' /></Card.Meta>
                        
                    </Card.Content>
                </Card>
            </Ref>
        )
    }
}

export default CardOverview
