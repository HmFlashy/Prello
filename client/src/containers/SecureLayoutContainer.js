import { connect } from 'react-redux';
import secureLayout from '../components/App/Layout/SecureLayout';

const mapStateToProps = (state,) => {
    return {
        token: state.authentification.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(secureLayout);