import cardOverview from '../../components/App/Card/CardOverview'
import { connect } from 'react-redux';
import { actionMoveCard } from '../../redux/actions/CardActions'

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.boardReducer.lists[ownProps.listIndex].card[ownProps.cardIndex]
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(cardOverview);