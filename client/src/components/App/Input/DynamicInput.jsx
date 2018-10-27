import React, { Component } from 'react';
import { Input, Ref } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import './DynamicInput.css'

class DynamicInput extends Component {

    componentDidMount(){
        this.node.children[0].focus()
    }

    render() {
        return (
            <Ref innerRef={ node => this.node = node }><Input type={this.props.type} maxLength={this.props.maxLength} name={this.props.name} placeholder={this.props.placeholder} 
                                        onClick={this.props.onClick} onKeyPress={this.props.onKeyPress}></Input></Ref>
        )
    }
}
DynamicInput.propTypes = {
    type: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onKeyPress: PropTypes.func,
    onClick: PropTypes.func
  };



export default DynamicInput