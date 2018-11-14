import { connect } from 'react-redux';
import TeamDetails from '../../components/App/Team/TeamDetails'
import TeamServices from '../../services/TeamServices';


const mapStateToProps = (state, ownProps) => {
    return {
        team: state.authentification.user.teams.find(team=>team.team._id === ownProps.teamId).team
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
        async deleteMember(teamId, memberId){
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetails);