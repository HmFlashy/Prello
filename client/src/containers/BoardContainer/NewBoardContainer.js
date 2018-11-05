import {connect} from "react-redux";
import boardServices from "../../services/BoardServices"
import newBoard from "../../components/App/Board/NewBoard"
import {actionAddBoard} from "../../redux/actions/UserActions"

const mapStateToProps = (state, ownProps) => {
    const user = state.authentification.user;
    return {
        categoryOptions: user ? [{key: "No Category", value: "No Category", text: "No Category"},
            ...user.categories.map(category => {
                return {key: category._id, value: category, text: category.name}
            })] : [],
        teamOptions: user ? [{key: "No Team", value: "No Team", text: "No Team"},
            ...user.teams.map(team => {
                return {key: team.team._id, value: team.team, text: team.team.name}
            })] : [],
        visibilityOptions: [
            {key: 1, value: "Private", text: "Private"},
            {key: 2, value: "Team", text: "Team"},
            {key: 3, value: "Public", text: "Public"}
        ],
        categoryId: ownProps.categoryId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async addBoard(name, category, visibility, team) {
            try {
                const categoryId = category._id? category._id:null;
                const teamId = team._id? team._id:null;
                const board = await boardServices.addBoard(name, categoryId, visibility, teamId);
                dispatch(actionAddBoard(board, categoryId))
            } catch (error) {
                console.log(error)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(newBoard);