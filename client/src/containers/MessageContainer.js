import message from '../components/App/Message'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        message: state.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        timeNotification() {
            setTimeout(() => dispatch({ type: 'HIDEFAILEDNOTIFICATION_' }), 5000)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(message);