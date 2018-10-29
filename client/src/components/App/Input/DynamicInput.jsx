import React, { Component } from 'react';
import { Input, Ref } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import './DynamicInput.css'

class DynamicInput extends Component {

    constructor(){
        super()
        this.textToInput = this.textToInput.bind(this)
        this.inputToText = this.inputToText.bind(this)
        this.validate = this.validate.bind(this)
        this.setNode = this.setNode.bind(this)
        this.state = {
            isInput: false
        }
    }

    textToInput(event) {
        event.stopPropagation()
        this.setState({
            isInput: true
        })
    }

    inputToText(event) {
        this.setState({
            isInput: false
        })
    }

    validate(event){
        if(event.charCode === 13){
            this.inputToText()
            this.props.onValidate(event)
        }
    }

    setNode(node) {
        this.node = node
        document.addEventListener('mousedown', (event) => {
            return this.node.contains(event.target) ? event.stopPropagation(): this.inputToText()
        })
        this.node.children[0].focus()
    }


    render() {
        return (
            <div onClick={this.textToInput}>
            {
                this.state.isInput ?
                    <Ref innerRef={ node => this.setNode(node) }>
                        <Input type={this.props.type} maxLength={this.props.maxLength} name={this.props.name} placeholder={this.props.placeholder} 
                                                onKeyPress={this.validate}>
                        </Input>
                    </Ref>
                    :
                    this.props.textToDisplay
            }
            </div>
        )
    }
}
DynamicInput.propTypes = {
    type: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onValidate: PropTypes.func
  };



export default DynamicInput