import { connect } from "react-redux";
import { } from "../../redux/actions/UserActions";
import poll from "../../components/App/Board/Board/Poll"
import pollServices from "../../services/PollServices"

const mapStateToProps = state => {
    return {
        cards: state.cards.all,
        boardId: state.boards.currentBoard._id,
        userId: state.authentification.user._id,
        polls: [
            {
                _id: "5bec522276647829627e7b64",
                title: "Super poll !",
                owner: "5bec522276647829627e7b61",
                card: { _id: "5bec522276647829627e7b68", name: "Add comment to a card" },
                options: [{
                    _id: "5bec522276647829627e7b",
                    title: "C'est nul",
                    voters: [{ _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },
                    { _id: "5bec522276647829627e7b61", fullName: "Kevin Giordani" },]
                }, {
                    _id: "5bec522276647829627e7b",
                    title: "Tro b1",
                    voters: []
                }]
            }
        ]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        vote(data) {
            console.log("VOTE : " + data)
            console.log(data)
            try {
                pollServices.vote(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        addOption(data) {
            console.log("ADD OPTION :" + data)
            console.log(data)
            try {
                pollServices.addOption(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        updatePoll(data) {
            console.log("UPDATING :" + data)
            console.log(data)
            try {
                pollServices.updatePoll(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        addPoll(data) {
            console.log("ADDING :" + data)
            console.log(data)
            try {
                pollServices.addPoll(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        deletePoll(data) {
            console.log("DELETE POLL :")
            console.log(data)
            try {
                pollServices.deletePoll(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        deletePollOption(data) {
            console.log("DELETE POLL OPTION:")
            console.log(data)
            try {
                pollServices.deletePollOption(data)
            }
            catch (e) {
                console.log(e)
            }
        },
        updatePollOption(data) {
            console.log("UPDATE POLL OPTION:")
            console.log(data)
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