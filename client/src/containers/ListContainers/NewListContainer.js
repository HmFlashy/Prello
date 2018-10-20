import { connect } from 'react-redux';
import listServices from '../../services/ListServices'
import { failedActionAddList } from '../../redux/actions/ListActions'
import newList from '../../components/App/List/NewList'

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = (dispatch, onwProps) => {
    return {
        async addList(name) {
            try {
                await listServices.addListApi(name)
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