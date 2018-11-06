import {connect} from "react-redux";
import userServices from "../../services/UserServices"
import listBoards from "../../components/App/Board/ListBoards/ListBoards"
import {actionAddCategory} from "../../redux/actions/UserActions";

const mapStateToProps = state => {
    const user = state.authentification.user;
    return {
        teams: user ? user.teams : [],
        categories: user ? user.categories : [],
        categoryOptions: user ? [{
            key: "No Category",
            value: {_id: "No Category", name: "No Category"},
            text: "No Category"
        },
            ...user.categories.map(category => {
                return {key: category._id, value: category, text: category.name}
            })] : []
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async addCategory(name) {
            try {
                const category = await userServices.addCategory(name);
                dispatch(actionAddCategory(category))
            } catch(error) {
                console.log(error)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoards);