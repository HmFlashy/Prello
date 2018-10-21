import React, { Component } from 'react';
import { Segment, Container, List } from 'semantic-ui-react'
import './NewList.css'

class NewList extends Component {

    render(){
        return (
            <Segment className='myList'>
                <input placeholder="Create a new list" onKeyDown={(event) => event.keyCode === 13 ? this.props.addList(event.target.value, this.props.boardId) : null }></input>
            </Segment>
        )
    }
}

export default NewList