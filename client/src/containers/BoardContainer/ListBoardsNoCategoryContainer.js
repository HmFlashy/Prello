import { connect } from 'react-redux';
import listBoardsNoCategory from '../../components/App/Board/ListBoardsNoCategory/ListBoardsNoCategory'

const mapStateToProps = state => {
    const user = state.authentification.user;
    return {
        boards: user ? user.boards.filter(board => !board.category).map(board => board.board) : [],
        categoryId: null,
        categoryName: "Uncategorized"
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoardsNoCategory);