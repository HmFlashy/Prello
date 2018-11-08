import React, {Component} from "react";
import "../BoardOverview/BoardOverview"
import './ListBoardsFilter.css'
import {Icon, List} from "semantic-ui-react"
import BoardOverviewContainer from "../../../../containers/BoardContainer/BoardOverviewContainer";
import NewBoardModalContainer from "../../../../containers/BoardContainer/NewBoardModalContainer";

class ListBoardsFilter extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div>
                <span><i className="user outline icon"/>{this.props.title}</span>
                <List className="lists list-boards">
                    {this.props.boards.map(boardId => (
                        <List.Item key={boardId} className='no-padding-top'>
                            <BoardOverviewContainer key={boardId} boardId={boardId}/>
                        </List.Item>
                    ))}
                    <List.Item key="new-board" className='no-padding-top'>
                        <NewBoardModalContainer teamId={this.props.teams?this.props.teams[0]:null}/>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default ListBoardsFilter