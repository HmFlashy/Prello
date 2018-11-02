import { connect } from 'react-redux';
import boardServices from '../../services/BoardServices'
import newBoard from '../../components/App/Board/NewBoard'

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async addBoard(name) {
            try {
                await boardServices.addBoard(name, ownProps.categoryId)
            } catch(error) {
                console.log(error)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(newBoard);