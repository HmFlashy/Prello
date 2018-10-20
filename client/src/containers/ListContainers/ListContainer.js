import { connect } from 'react-redux';
import listServices from '../../services/ListServices'
import {actionUpdateListName, failedActionUpdateListName} from '../../redux/actions/ListActions'
import list from '../../components/App/List/List'

const mapStateToProps = (state, ownProps) => {
    const list = state.boardReducer.currentBoard.lists[0];
    return {
        list: list
    }
};

const mapDispatchToProps = (dispatch, onwProps) => {
    return {
        async updateListName(list) {
            try {
                await listServices.updateListNameApi(list._id, list.name)
            } catch(error) {
                dispatch(failedActionUpdateListName(error))
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(list);