import React, { Component } from 'react';
import { Segment, Input } from 'semantic-ui-react'
import './NewList.css'

class NewList extends Component {

    getPos() {
        const posSorted = this.props.board.lists.map(list => list.pos).sort((a, b) => a - b)
        return posSorted.length !== 0 ? posSorted[posSorted.length - 1] + 100000 : 100000
    }

    render() {
        return (
            <div className="myDiv">
                <Segment className='myList'>
                    <Input placeholder="Create a new list" onKeyDown={(event) => event.keyCode === 13 ? this.props.addList(event.target.value, this.props.board._id, this.getPos(event.target.value = "")) : null}></Input>
                </Segment>
            </div >
        )
    }
}

export default NewList