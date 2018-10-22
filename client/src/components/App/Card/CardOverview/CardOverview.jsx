import React, { Component } from 'react';
import './CardOverview.css'
import { Segment, Container } from 'semantic-ui-react'


class CardOverview extends Component {

    constructor(){
        super()
        this.textToTextInput = this.textToTextInput.bind(this)
        this.updateName = this.updateName.bind(this)
        this.displayCardModal = this.displayCardModal.bind(this)
        this.state = {
            isNameUpdating: false
        }
    }

    componentDidMount(){
    }

    textToTextInput(){
        this.setState({
            isNameUpdating: true
        })
    }

    updateName(name){
        this.setState({
            isNameUpdating: false
        })
        this.props.updateName(this.props.card._id, name)
    }

    displayCardModal(){
        console.log(this.props)
        this.props.history.push(`/card/${this.props.card._id}`)
        this.props.displayCardModal(this.props.card._id)
    }

    render(){
        return (
            <Segment className='cardOverview' onClick={this.displayCardModal}>
                <p onClick={this.textToTextInput}>
                    { !this.state.isNameUpdating ? this.props.card.name : <input type="text" name="name" placeholder= {this.props.card.name} onKeyPress={(event) => event.charCode === 13 ? this.updateName(event.target.value) : null}></input> }
                </p>
                <span className='pos' color="textSecondary">
                    adjective
                </span>
            </Segment>
        )
    }
}

export default CardOverview
