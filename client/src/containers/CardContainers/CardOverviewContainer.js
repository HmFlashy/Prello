import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { actionUpdateCardName, failedActionUpdateCardName } from '../../redux/actions/CardActions'
import cardServices from '../../services/CardServices'

const mapStateToProps = (state, ownProps) => {
    return {
        //card: state.boardReducer.lists[ownProps.listIndex].card[ownProps.cardIndex]
        card: {
            name: "Test"
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async updateName(card) {
            return cardServices.updateCardNameApi(card._id, card.name).then(
                card => dispatch(actionUpdateCardName(card._id, card.name)),
                error => dispatch(failedActionUpdateCardName(card._id, card.name))
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(cardOverview);