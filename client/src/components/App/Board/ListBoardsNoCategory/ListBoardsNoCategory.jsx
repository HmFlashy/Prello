import React, {Component} from "react";
import "../BoardOverview/BoardOverview"
import {Icon, List} from "semantic-ui-react"
import BoardOverviewContainer from "../../../../containers/BoardContainer/BoardOverviewContainer";
import NewBoardContainer from "../../../../containers/BoardContainer/NewBoardContainer";

class ListBoardNoCategory extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span><i className="user outline icon"/>{this.props.categoryName}</span>
                <List className="lists">
                    {this.props.boards.map(boardId => (
                        <List.Item key={boardId} className='no-padding-top'>
                            <BoardOverviewContainer key={boardId} boardId={boardId}/>
                        </List.Item>
                    ))}
                    <NewBoardContainer categoryId={null}/>
                </List>
            </div>
        )
    }
}

export default ListBoardNoCategory