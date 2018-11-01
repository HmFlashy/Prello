import React, { Component } from 'react';
import '../../Card/CardOverview/CardOverview'
import {List, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class BoardOverview extends Component {

    componentWillMount(){
    }

    render(){
        return (
            <Segment className='cardOverview'>
                <Link to={`/boards/${this.props.board._id}`}>
                    {this.props.board ? this.props.board.name: ""}
                </Link>
            </Segment>
        );
    }
}

export default BoardOverview