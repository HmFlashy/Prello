import Header from './../../components/App/Board/Board/Header'
import {connect} from "react-redux";
import socketService from "../../services/SocketService";
import userServices from "../../services/UserServices";
import {actionBoardSubscribe} from "../../redux/actions/BoardActions";
import {actionStarBoard, actionUnstarBoard} from "../../redux/actions/UserActions";
import {withRouter} from "react-router"

const mapStateToProps = (state, ownProps) => {
    const archivedCards = state.cards.all.filter(card => card.isArchived)
    return {
        archivedCards: archivedCards
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));