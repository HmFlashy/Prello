import board from '../components/App/Board'
import { connect } from 'react-redux';
import socketService from '../services/SocketService'
import cardServices from '../services/CardServices'
import { actionBoardSubscribe } from '../redux/actions/BoardActions'
import { failedActionAddCard } from '../redux/actions/CardActions'

const mapStateToProps = state => {
    return {
        board: state.boardReducer
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