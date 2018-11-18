import { connect } from "react-redux";
import boardOverviewModal from "../../components/App/Board/BoardOverviewModal/BoardOverviewModal"
import boardServices from "../../services/BoardServices"
import {
    actionUpdateBoardName,
    actionUpdateBoardCategory,
    actionUpdateBoardVisibility,
    failedActionBoardUpdateName,
    failedActionUpdateBoardCategory,
    failedActionUpdateBoardVisibility
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
        categoryOptions: [{ key: "No Category", value: "No Category", text: "No Category" },
        ...user.categories.map(category => {
            return { key: category._id, value: category, text: category.name }
        })],
        visibilityOptions: [
            { key: 1, value: "Private", text: "Private" },
            { key: 3, value: "Public", text: "Public" }
        ],
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async updateBoard(name, oldName, category, oldCategory, visibility, oldVisibility) {
            const categoryId = category._id ? category._id : null;
            try {
                dispatch(actionUpdateBoardName({ _id: ownProps.boardId, name: name }));
                dispatch(actionUpdateBoardCategory({ _id: ownProps.boardId, category: category }));
                dispatch(actionUpdateBoardVisibility({ _id: ownProps.boardId, visibility: visibility }));
                return await boardServices.updateBoard(ownProps.boardId, name, categoryId, visibility);
            } catch (error) {
                dispatch(failedActionBoardUpdateName({ _id: ownProps.boardId, name: oldName }));
                dispatch(failedActionUpdateBoardCategory({ _id: ownProps.boardId, category: oldCategory }));
                dispatch(failedActionUpdateBoardVisibility({ _id: ownProps.boardId, visibility: oldVisibility }));
                console.log(error)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(boardOverviewModal);