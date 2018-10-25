import messageCard from '../../components/App/Message/MessageCard'
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        error: state.errors.all.find(error => error._id === ownProps.errorId)
    }
};

const mapDispatchToProps = dispatch => {
    return {
        timeNotification(errorId) {
            setTimeout(() => dispatch({ type: 'HIDEFAILEDNOTIFICATION_', payload: errorId }), 5000)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(messageCard);