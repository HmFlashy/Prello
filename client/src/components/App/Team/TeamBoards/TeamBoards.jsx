import React, { Component } from 'react';
import { Segment, Input, Container } from 'semantic-ui-react'
import './TeamBoards.css'
import BoardOverviewContainer from '../../../../containers/BoardContainer/BoardOverviewContainer';
import NewBoardModalContainer from '../../../../containers/BoardContainer/NewBoardModalContainer';

class TeamBoards extends Component {


    render(){
        console.log("Boards: " + this.props.team.boards)
        return (
            <div>
                {
                    this.props.team.boards.map(board => {
                        return (<BoardOverviewContainer boardId={ board._id } />)
                    })
                    
                }
                <NewBoardModalContainer teamId={this.props.team._id} />
            </div>
        )
    }
}

export default TeamBoards