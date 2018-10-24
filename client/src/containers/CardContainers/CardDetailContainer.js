import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CardDetail from '../../components/App/Card/CardDetail';
import CardContainerServices from "./CardContainerServices"

const mapStateToProps = (state, ownProps) => {
    return {
        card: state.cardModalReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        async fetchCard(cardId) {
            return await CardContainerServices.fetchCard(cardId, dispatch)
        },
        async updateCard(cardId, data) {
            CardContainerServices.updateCard(cardId, data, dispatch)
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CardDetail));