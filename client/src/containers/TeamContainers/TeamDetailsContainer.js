import { connect } from "react-redux";
import TeamDetails from "../../components/App/Team/TeamDetails"
import TeamServices from "../../services/TeamServices";
import { actionUpdateSearch } from "../../redux/actions/UserActions";

const mapStateToProps = (state, ownProps) => {
    const userTeam = state.authentification.user.teams.find(team => team.team._id === ownProps.teamId);
    const query = state.authentification.queryMember;
    return {
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
                const data = await TeamServices.addUsersToTeam(teamId, users)
                return data
            } catch (error) {
                throw error
            }
        },
        async deleteMember(teamId, memberId) {
            try {
                const data = await TeamServices.deleteMember(teamId, memberId)
                return data
            } catch (error) {
                throw error
            }
        },
        async changeRole(teamId, memberId, role) {
            try {
                const data = await TeamServices.updateMember(teamId, memberId, role)
                return data
            } catch (error) {
                throw error
            }
        },
        updateSearch(query) {
            dispatch(actionUpdateSearch(query))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetails);