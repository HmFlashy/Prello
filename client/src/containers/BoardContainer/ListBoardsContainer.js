import { connect } from "react-redux";
import userServices from "../../services/UserServices"
import listBoards from "../../components/App/Board/ListBoards/ListBoards"
import { actionAddCategory, actionDeleteCategory, actionUpdateCategoryName } from "../../redux/actions/UserActions";
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
    const user = state.authentification.user;
    return {
        teams: user.teams,
        categories: user.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async addCategory(name) {
            try {
                const category = await userServices.addCategory(name);
                dispatch(actionAddCategory(category))
            } catch (error) {
                console.log(error)
            }
        },
        async deleteCategory(id) {
            try {
                await userServices.deleteCategory(id);
                dispatch(actionDeleteCategory(id))
            } catch (error) {
                console.log(error)
            }
        },
        async updateCategoryName(id, name) {
            try {
                await userServices.updateCategoryName(id, name);
                dispatch(actionUpdateCategoryName(id, name))
            } catch (error) {
                console.log(error)
            }
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(listBoards));