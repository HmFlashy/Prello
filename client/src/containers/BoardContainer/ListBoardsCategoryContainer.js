import {connect} from "react-redux";
import listBoardsCategory from "../../components/App/Board/ListBoardsCategory/ListBoardsCategory"

const mapStateToProps = (state, ownProps) => {
    const user = state.authentification.user;
    return {
        boards: user ? user.boards.filter(board => board.category ? board.category._id === ownProps.categoryId : board.category === ownProps.categoryId).map(board => board.board) : [],
        categoryId: ownProps.categoryId,
        categoryName: ownProps.categoryName
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoardsCategory);