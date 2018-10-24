import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import cardServices from '../../services/CardServices'
import { actionDisplayCardModal } from '../../redux/actions/BoardActions'
import CardContainerServices from "./CardContainerServices"
import { failedActionAddCard } from '../../redux/actions/CardActions';

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cardReducer.cards.find(card => ownProps.cardId === card._id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async updateCard(cardId, oldValue, data) {
            dispatch(failedActionAddCard("lol"))
            CardContainerServices.updateCard(cardId, oldValue, data, dispatch)
        },
        displayCardModal(cardId) {
            dispatch(actionDisplayCardModal(cardId))
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(cardOverview));