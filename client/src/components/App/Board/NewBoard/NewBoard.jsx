import React, { Component } from 'react';
import { Segment, Input } from 'semantic-ui-react'

class NewBoard extends Component {
    render(){
        return (
            <Segment>
                <Input placeholder="Create a new board" onKeyDown={(event) => event.keyCode === 13 ? this.props.addBoard(event.target.value) : null }></Input>
            </Segment>
        )
    }
}

export default NewBoard