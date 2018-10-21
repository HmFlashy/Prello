import BoardOverview from '../../components/App/Board/BoardOverview/BoardOverview'
import { connect } from 'react-redux';
import socketService from "../../services/SocketService";
import {actionBoardSubscribe} from "../../redux/actions/BoardActions";

const mapStateToProps = (state, ownProps) => {
    return {
        board: state.boardReducer.boards.find(board => ownProps.boardId === board._id)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        subscribe(){
            socketService.subscribe()
            dispatch(actionBoardSubscribe())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardOverview);