import React, { Component } from 'react';
import '../../Card/CardOverview/CardOverview'
import {List, Segment} from 'semantic-ui-react'

class BoardOverview extends Component {

    componentWillMount(){
        this.props.subscribe()
    }

    handleClick(){
        this.props.history.push({
            pathname: '/boards/:boardId',
            state: {
                'boardId': this.props.board._id
            }
        })
    }

    render(){
        return (
            <Segment className='cardOverview'>
                <button onClick={this.handleClick}>
                    {this.props.board ? this.props.board.name: ""}
                </button>
            </Segment>
        );
    }
}

export default BoardOverview