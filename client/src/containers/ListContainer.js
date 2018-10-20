import { connect } from 'react-redux';
import listServices from '../services/ListServices'
import cardServices from '../services/CardServices'
import {actionUpdateListName, failedActionUpdateListName} from '../redux/actions/ListActions'
import { failedActionAddCard } from '../redux/actions/CardActions'
import list from '../components/App/List'

const mapStateToProps = (state, ownProps) => {
    return {
        list: ownProps.list
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
        },
        async addCard(name, listId) {
            try {
                await cardServices.addCardApi(name, listId)
            } catch(error) {
                console.log(error)
                return dispatch(failedActionAddCard(error))
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(list);