import { connect } from 'react-redux';
import listServices from '../../services/ListServices'
import { failedActionAddList } from '../../redux/actions/ListActions'
import newList from '../../components/App/List/NewList'

const mapStateToProps = state => {
    return {
        board: state.boards.currentBoard
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async addList(name, boardId, pos) {
            try {
                await listServices.addListApi(name, boardId, pos)
            } catch (error) {
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