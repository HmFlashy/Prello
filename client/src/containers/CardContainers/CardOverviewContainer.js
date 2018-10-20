import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { failedActionUpdateCardName } from '../../redux/actions/CardActions'
import cardServices from '../../services/CardServices'

const mapStateToProps = (state, ownProps) => {
    console.log(state.cardReducer.cards)
    return {
        card: state.cardReducer.cards.find(card => ownProps.cardId === card._id)
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async updateName(cardId, name) {
            try {
                await cardServices.updateCardNameApi(cardId, name)
            } catch(error) {
                console.log(error)
                return dispatch(failedActionUpdateCardName(error))
            }
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(cardOverview);