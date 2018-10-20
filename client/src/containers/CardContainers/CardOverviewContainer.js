import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { failedActionUpdateCardName } from '../../redux/actions/CardActions'
import cardServices from '../../services/CardServices'

const mapStateToProps = (state, ownProps) => {
    return {
        //card: state.boardReducer.lists[ownProps.listIndex].card[ownProps.cardIndex]
        card: ownProps.card
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