import board from '../components/App/Board'
import { connect } from 'react-redux';
import socketService from '../services/SocketService'
import { actionBoardSubscribe } from '../redux/actions/BoardActions'

const mapStateToProps = state => {
    const board = state.boardReducer.currentBoard;
    return {
        board
    }
};

const mapDispatchToProps = dispatch => {
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
)(board);