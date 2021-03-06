import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { actionDisplayCardModal } from '../../redux/actions/BoardActions'
import CardContainerServices from "./CardContainerServices"

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cards.all.find(card => ownProps.cardId === card._id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async updateCard(cardId, oldValue, data) {
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