import React, { Component } from 'react';
import { Segment, Input } from 'semantic-ui-react'
import './NewList.css'

class NewList extends Component {


    render() {
        return (
            <div className="myDiv">
                <Segment className='myList'>
                    <Input placeholder="Create a new list" onKeyDown={(event) => event.keyCode === 13 ? this.props.addList(event.target.value, this.props.boardId) : null}></Input>
                </Segment>
            </div>
        )
    }
}

export default NewList