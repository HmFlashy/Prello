import { connect } from "react-redux";
import { } from "../../redux/actions/UserActions";
import poll from "../../components/App/Board/Board/Poll"
import pollServices from "../../services/PollServices"

const mapStateToProps = state => {
    return {
        cards: state.cards.all,
        boardId: state.boards.currentBoard._id,
        userId: state.authentification.user._id,
        polls: state.boards.currentBoard.polls
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        vote(data) {
            try {
                pollServices.vote(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        addOption(data) {
            try {
                pollServices.addOption(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        updatePoll(data) {
            try {
                pollServices.updatePoll(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        addPoll(data) {
            try {
                pollServices.addPoll(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        deletePoll(data) {
            try {
                pollServices.deletePoll(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        deletePollOption(data) {
            try {
                pollServices.deletePollOption(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        updatePollOption(data) {
            try {
                pollServices.updatePollOption(data)
            }
            catch (e) {
                console.log(e)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(poll);