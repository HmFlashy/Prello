import { connect } from 'react-redux';
import listBoardsStar from '../../components/App/Board/ListBoardsFilter/ListBoardsFilter'

const mapStateToProps = (state, ownProps) => {
    const user = state.authentification.user;
    const boardsWithTeam =  user ? user.boards.filter(boardUser => {
        const board = state.boards.all.find(board => (board._id === boardUser.board));
            return ((ownProps.noTeam?
                board.teams.filter(teamBoard =>
                user.teams.map(team => team.team._id).includes(teamBoard)).length === 0:
                ownProps.teams?board.teams.filter(teamBoard => ownProps.teams.includes(teamBoard)).length > 0:true)
            && (boardUser.category ? ownProps.categories.includes(boardUser.category._id) :
                ownProps.categories.includes("No Category")) &&
                (ownProps.onlyStars?user.starred.includes(boardUser.board):true))
        })
        .map(board => board.board) : [];
    return {
        boards: boardsWithTeam
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoardsStar);