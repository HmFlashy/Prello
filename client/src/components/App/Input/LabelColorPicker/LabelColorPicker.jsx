import React, { Component } from 'react';
import { Grid, Label, Dropdown, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import './LabelColorPicker.css'

class LabelColorPicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            color: props.color || "color"
        }
    }

    getLine(colors) {
        let jsxColor = colors.map(color => {
            return <Grid.Column className="segmentPicker">
                <Segment size="medium" color={color} inverted onClick={() => this.setState({ color }, () => this.props.onSelect && this.props.onSelect(color))}></Segment>
            </Grid.Column>
        })
        let beginning = 0
        let end = 3
        let res = []
        while (end < colors.length) {
            res.push(<Grid.Row>
                {jsxColor.slice(beginning, end)}
            </Grid.Row>)
            beginning = beginning + 3
            end + 3 > jsxColor.length ? end = jsxColor.length : end = end + 3
        }
        return <Grid columns={3} divided className="rowPicker"> {res} </Grid>
    }

    render() {
        return (
            <Label color={this.state.color} inverted size={this.props.size}>
                <Dropdown text={this.state.color} floating className='icon' >
                    <Dropdown.Menu>
                        <Dropdown.Menu scrolling>
                            {this.getLine(["red", "orange", "yellow", "olive", "green", "teal",
                                "blue", "violet", "purple", "pink", "brown", "grey",
                                "black"])
                            }
                        </Dropdown.Menu>
                    </Dropdown.Menu>
                </Dropdown>
            </Label>
        )
    }
}

export default LabelColorPicker