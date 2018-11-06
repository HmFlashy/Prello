import { connect } from 'react-redux';
import socketService from '../../services/SocketService'
import boardServices from '../../services/BoardServices'
import listBoards from '../../components/App/Board/ListBoards/ListBoards'
import { actionBoardSubscribe, actionFetchingBoards, actionFailedFetchBoards, actionBoardsFetched } from '../../redux/actions/BoardActions'

const mapStateToProps = state => {
    const user = state.authentification.user;
    return {
        teams: user?user.teams:[],
        categories: user?user.categories: [],
        categoryOptions: user ? [{key: "No Category", value: {_id: "No Category", name: "No Category"}, text: "No Category"},
            ...user.categories.map(category => {
                return {key: category._id, value: category, text: category.name}
            })] : []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoards);