import React, {Component} from "react";
import "../BoardOverview/BoardOverview"
import './ListBoardsCategory.css'
import {Icon, List} from "semantic-ui-react"
import BoardOverviewContainer from "../../../../containers/BoardContainer/BoardOverviewContainer";
import NewBoardModalContainer from "../../../../containers/BoardContainer/NewBoardModalContainer";

class ListBoardCategory extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span><i className="user outline icon"/>{this.props.categoryName}</span>
                <List className="lists list-boards">
                    {this.props.boards.map(boardId => (
                        <List.Item key={boardId} className='no-padding-top'>
                            <BoardOverviewContainer key={boardId} boardId={boardId}/>
                        </List.Item>
                    ))}
                    <List.Item key="new-board" className='no-padding-top'>
                        <NewBoardModalContainer categoryId={this.props.categoryId}/>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export default ListBoardCategory