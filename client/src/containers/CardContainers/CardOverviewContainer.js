import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import cardServices from '../../services/CardServices'
import { actionDisplayCardModal } from '../../redux/actions/BoardActions'
import CardContainerServices from "./CardContainerServices"

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cardReducer.cards.find(card => ownProps.cardId === card._id)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async updateCard(cardId, data) {
            CardContainerServices.updateCard(cardId, data, dispatch)
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