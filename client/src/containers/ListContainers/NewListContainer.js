import { connect } from 'react-redux';
import listServices from '../../services/ListServices'
import { failedActionAddList } from '../../redux/actions/ListActions'
import newList from '../../components/App/List/NewList'

const mapStateToProps = state => {
    console.log(state.boards.currentBoard._id)
    return {
        boardId: state.boards.currentBoard._id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async addList(name, boardId) {
            try {
                await listServices.addListApi(name, boardId)
            } catch(error) {
                console.log(error)
                dispatch(failedActionAddList(error))
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(newList);