import { connect } from 'react-redux';
import loggedOffLayout from '../components/App/Layout/LoggedOffLayout';

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
)(loggedOffLayout);