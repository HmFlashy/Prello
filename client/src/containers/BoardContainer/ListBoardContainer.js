import { connect } from 'react-redux';
import socketService from '../../services/SocketService'
import boardServices from '../../services/BoardServices'
import listBoards from '../../components/App/Board/ListBoards/ListBoards'
import { actionBoardSubscribe, actionFetchingBoards, actionFailedFetchBoards, actionBoardsFetched } from '../../redux/actions/BoardActions'

const mapStateToProps = state => {
    return {
        boards: state.boards.all.map(board => board._id)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        subscribe(){
            socketService.subscribe()
            dispatch(actionBoardSubscribe())
        },
        async fetchBoards(){
            try {
                dispatch(actionFetchingBoards())
                const boards = await boardServices.fetchBoards()
                dispatch(actionBoardsFetched(boards))
            } catch(error) {
                return dispatch(actionFailedFetchBoards(error))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoards);