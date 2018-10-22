import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { failedActionUpdateCardName } from '../../redux/actions/CardActions'
import cardServices from '../../services/CardServices'
import { 
    actionDisplayCardModal

} from '../../redux/actions/BoardActions'

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cardReducer.cards.find(card => ownProps.cardId === card._id)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async updateName(cardId, name) {
            try {
                await cardServices.updateCardNameApi(cardId, name)
            } catch (error) {
                console.log(error)
                return dispatch(failedActionUpdateCardName(error))
            }
        },
        displayCardModal(cardId){
            dispatch(actionDisplayCardModal(cardId))
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(cardOverview));