import { connect } from 'react-redux';
import errorLayout from '../components/App/Layout/ErrorLayout';

const mapStateToProps = (state,) => {
    return {
        errors: state.errors.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(errorLayout);