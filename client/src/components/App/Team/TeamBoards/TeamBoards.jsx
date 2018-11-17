import React, { Component } from 'react';
import './TeamBoards.css'
import BoardOverviewContainer from '../../../../containers/BoardContainer/BoardOverviewContainer';

class TeamBoards extends Component {


    render(){
        console.log("Boards: ")
        console.log(this.props.team)
        return (
            <div className="team-boards-overview">
                {
                    this.props.team.boards.map(board => {
                        return (<BoardOverviewContainer boardId={ board._id } />)
                    })
                    
                }
            </div>
        )
    }
}

export default TeamBoards