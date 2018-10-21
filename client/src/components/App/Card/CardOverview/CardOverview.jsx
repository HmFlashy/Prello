import React, { Component } from 'react';
import './CardOverview.css'
import { Segment, Container } from 'semantic-ui-react'

class CardOverview extends Component {

    constructor(){
        super()
        this.textToTextInput = this.textToTextInput.bind(this)
        this.updateName = this.updateName.bind(this)
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

    render(){
        return (
            <Segment className='cardOverview'>
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
