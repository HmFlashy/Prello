import React, { Component } from 'react';
import { Modal, Label, Dropdown, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import './LabelColorPicker.css'

class LabelColorPicker extends Component {

    constructor() {
        super()
        this.state = {
            color: "color"
        }
    }

    render() {
        return (
            <Label color={this.state.color} inverted size={this.props.size}>
                <Dropdown text={this.state.color} floating className='icon' >
                    <Dropdown.Menu>
                        <Dropdown.Menu scrolling>
                            {["red", "orange", "yellow", "olive", "green", "teal",
                                "blue", "violet", "purple", "pink", "brown", "grey",
                                "black"].map(color =>
                                    <Dropdown.Item>
                                        <Segment size="big" color={color} inverted onClick={() => this.setState({ color }, () => this.props.onSelect && this.props.onSelect(color))}></Segment>
                                    </Dropdown.Item>
                                )}
                        </Dropdown.Menu>
                    </Dropdown.Menu>
                </Dropdown>
            </Label>
        )
    }
}

export default LabelColorPicker