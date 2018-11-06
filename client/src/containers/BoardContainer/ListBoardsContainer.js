import { connect } from 'react-redux';
import socketService from '../../services/SocketService'
import boardServices from '../../services/BoardServices'
import listBoards from '../../components/App/Board/ListBoards/ListBoards'
import { actionBoardSubscribe, actionFetchingBoards, actionFailedFetchBoards, actionBoardsFetched } from '../../redux/actions/BoardActions'
import userServices from '../../services/UserServices'
import { actionGetProfile } from "../../redux/actions/UserActions";

const mapStateToProps = state => {
    const user = state.authentification.user;
    return {
        teams: user.teams,
        categories: user.categories,
        categoryOptions: [{key: "No Category", value: {_id: "No Category", name: "No Category"}, text: "No Category"},
            ...user.categories.map(category => {
                return {key: category._id, value: category, text: category.name}
            })]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async fetchBoards(){
            try {
                dispatch(actionFetchingBoards());
                const boards = await boardServices.fetchBoards();
                dispatch(actionBoardsFetched(boards))
            } catch(error) {
                return dispatch(actionFailedFetchBoards(error))
            }
        },
        async getUser(){
            try {
                const user = await userServices.getUser();
                dispatch(actionGetProfile(user))
            } catch(error) {
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoards);