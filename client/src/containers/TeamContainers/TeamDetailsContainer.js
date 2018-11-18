import { connect } from "react-redux";
import TeamDetails from "../../components/App/Team/TeamDetails"
import TeamServices from "../../services/TeamServices";
import { actionUpdateSearch,actionChangeRole, actionDeleteUsersToTeam,actionTeamUpdateName, failedActionTeamUpdateName, actionAddUsersToTeam, failedActionAddUsersToTeam} from "../../redux/actions/UserActions";

const mapStateToProps = (state, ownProps) => {
    const userTeam = state.authentification.user.teams.find(team => team.team._id === ownProps.teamId);
    const query = state.authentification.queryMember;
    let isAdmin = false
    if(userTeam){
console.log(userTeam)
        const user = userTeam.team.members.find(member => console.log(member) || member.member._id === state.authentification.user._id)
        console.log(user)
        if(user){
            isAdmin = user.role === "Admin"
        }
    }
    return {
        isAdmin: isAdmin,
        boards: state.authentification.user.boards,
        team: userTeam ? {
            ...userTeam.team,
            members: query.length > 0 ? userTeam.team.members.filter(teamMember => teamMember.member.fullName.toLowerCase().includes(query.toLowerCase())) : userTeam.team.members
        } : state.teams.currentTeam,
        queryMember: query
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async fetchTeam(teamId) {
            try {
                const data = await TeamServices.getTeam(teamId)
                return data
            } catch (error) {
                console.log(error)
            }
        },
        async addUsersToTeam(teamId, users) {
            try {
                dispatch(actionAddUsersToTeam({ teamId: teamId, users: users }))
                const data = await TeamServices.addUsersToTeam(teamId, users)
                return data
            } catch (error) {
                dispatch(failedActionAddUsersToTeam({ teamId: teamId, users: users }))
                throw error
            }
        },
        async deleteMember(teamId, memberId) {
            try {
                dispatch(actionDeleteUsersToTeam({ teamId: teamId, users: memberId }))
                const data = await TeamServices.deleteMember(teamId, memberId)
                return data
            } catch (error) {
                throw error
            }
        },
        async changeRole(teamId, memberId, role) {
            try {
                dispatch(actionChangeRole({ memberId, teamId, role }))
                const data = await TeamServices.updateMember(teamId, memberId, role)
                return data
            } catch (error) {
                throw error
            }
        },
        updateSearch(query) {
            dispatch(actionUpdateSearch(query))
        },
        async updateTeamName(teamId, oldVal, newVal) {
            try {
                dispatch(actionTeamUpdateName({ teamId: teamId, name: newVal }))
                await TeamServices.updateName(teamId, newVal)
            } catch (error) {
                dispatch(failedActionTeamUpdateName({ _id: teamId, name: oldVal }))
                console.log(error)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetails);