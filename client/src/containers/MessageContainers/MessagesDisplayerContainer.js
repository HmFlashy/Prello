import messagesDisplayer from '../../components/App/Message/MessagesDisplayer'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        errors: state.errors.all.map(error => error._id)
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(messagesDisplayer);