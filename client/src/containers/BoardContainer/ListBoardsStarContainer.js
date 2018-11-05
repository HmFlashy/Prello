import { connect } from 'react-redux';
import listBoardsStar from '../../components/App/Board/ListBoardsStar/ListBoardsStar'

const mapStateToProps = state => {
    const user = state.authentification.user;
    const boardsStar = user?user.starred:[];
    return {
        boards: user?user.starred:[]
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoardsStar);