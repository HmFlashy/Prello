import React, { Component } from "react";
import "../BoardOverview/BoardOverview"
import './ListBoardsFilter.css'
import { Icon, List, Divider, Button } from "semantic-ui-react"
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
                <Divider horizontal>
                    <div>
                        <Icon className="left-icon-list-board-title" name={
                            this.props.onlyStars ? "star" :
                                this.props.noTeam ? "user" :
                                    "group"
                        } />
                        {this.props.title}
                        <NewBoardModalContainer teamId={this.props.teams ? this.props.teams[0] : null} />
                    </div>
                </Divider>
                <List className="lists list-boards">
                    {
                        this.props.boards.length ? this.props.boards.map(boardId => (
                            <List.Item key={boardId} className='no-padding-top'>
                                <BoardOverviewContainer key={boardId} boardId={boardId} />
                            </List.Item>
                        )) :
                            <div className="no-board">
                                {
                                    this.props.onlyStars ? <h3>You have no starred boards</h3> :
                                        this.props.noTeam ? <h3>You have no personal boards</h3> :
                                            <h3>This team has no boards</h3>
                                }
                            </div>
                    }
                </List>
            </div>
        )
    }
}

export default ListBoardsFilter