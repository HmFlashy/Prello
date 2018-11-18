import React, { Component } from 'react';
import './TeamBoards.css'
import BoardOverviewContainer from '../../../../containers/BoardContainer/BoardOverviewContainer';

class TeamBoards extends Component {


    render() {
        return (
            this.props.boards
             ?
                <div className="team-boards-overview">
                    {
                        this.props.team.boards.map(board =>
                            this.props.boards.some(b => b.board === board._id)
                                ? (<BoardOverviewContainer key={ board._id } boardId={board._id} />)
                                : ''
                        )

                    }
                </div>
                : ""
        )
    }
}

export default TeamBoards