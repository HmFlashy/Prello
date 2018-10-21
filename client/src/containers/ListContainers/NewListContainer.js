import { connect } from 'react-redux';
import listServices from '../../services/ListServices'
import { failedActionAddList } from '../../redux/actions/ListActions'
import newList from '../../components/App/List/NewList'

const mapStateToProps = state => {
    return {
        idBoard: state.boardReducer.currentBoard._id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async addList(name) {
            try {
                await listServices.addListApi(name, this.props.idBoard)
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