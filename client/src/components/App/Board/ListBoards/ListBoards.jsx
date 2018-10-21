import React, {Component} from 'react';
import '../Board/Board.css'
import BoardOverviewContainer from '../../../../containers/BoardContainer/BoardOverviewContainer'
import {List} from 'semantic-ui-react'

class ListBoards extends Component {

    componentWillMount() {
        this.props.subscribe()
        this.props.fetchBoards()
    }

    render() {
        return (
            <List className='board'>
                {this.props.boards.map(boardId => (
                    <List.Item className='no-padding-top'><BoardOverviewContainer key={boardId} boardId={boardId}/>
                    </List.Item>
                ))}
            </List>
        );
    }
}

export default ListBoards