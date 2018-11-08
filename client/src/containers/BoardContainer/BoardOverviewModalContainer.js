import {connect} from "react-redux";
import boardOverviewModal from "../../components/App/Board/BoardOverviewModal/BoardOverviewModal"
import boardServices from "../../services/BoardServices"
import {
    actionUpdateBoardName,
    actionUpdateBoardCategory,
    actionUpdateBoardVisibility
} from "../../redux/actions/BoardActions"

const mapStateToProps = (state, ownProps) => {
    const user = state.authentification.user;
    const board = state.boards.all.find(board => ownProps.boardId === board._id)
    const userBoard = user.boards.find(board => board.board === ownProps.boardId)
    return {
        board: {
            ...board,
            category: userBoard ? userBoard.category : null
        },
        categoryOptions: user ? [{key: "No Category", value: "No Category", text: "No Category"},
            ...user.categories.map(category => {
                return {key: category._id, value: category, text: category.name}
            })] : [],
        visibilityOptions: [
            {key: 1, value: "Private", text: "Private"},
            {key: 2, value: "Team", text: "Team"},
            {key: 3, value: "Public", text: "Public"}
        ],
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async updateBoard(name, category, visibility) {
            try {
                const categoryId = category._id ? category._id : null;
                const board = await boardServices.updateBoard(ownProps.boardId, name, categoryId, visibility);
                dispatch(actionUpdateBoardName(board._id, name))
                dispatch(actionUpdateBoardCategory(board._id, category))
                dispatch(actionUpdateBoardVisibility(board._id, visibility))
            } catch (error) {
                console.log(error)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(boardOverviewModal);