import React, { Component } from 'react';
import './TeamBoards.css'
import BoardOverviewContainer from '../../../../containers/BoardContainer/BoardOverviewContainer';

class TeamBoards extends Component {


    render() {
        return (
            console.log(this.props) || this.props.boards ?
                <div className="team-boards-overview">
                    {
                        this.props.team.boards.map(board =>
                            this.props.boards.some(b => console.log(b.board, board._id) || b.board === board._id)
                                ? (<BoardOverviewContainer boardId={board._id} />)
                                : ''
                        )

                    }
                </div>
                : ""
        )
    }
}

export default TeamBoards