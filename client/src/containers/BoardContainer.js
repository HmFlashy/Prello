import board from '../components/App/Board'
import { connect } from 'react-redux';
import socketService from '../services/SocketService'
import cardServices from '../services/CardServices'
import { actionBoardSubscribe } from '../redux/actions/BoardActions'
import { failedActionAddCard } from '../redux/actions/CardActions'

const mapStateToProps = state => {
    return {
        cards: state.boardReducer.cards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        subscribe(){
            socketService.subscribe()
            dispatch(actionBoardSubscribe())
        },
        async addCard(name) {
            try {
                await cardServices.addCardApi(name)
            } catch(error) {
                console.log(error)
                return dispatch(failedActionAddCard(error))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(board);