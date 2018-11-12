import { connect } from 'react-redux';
import TeamDetails from '../../components/App/Team/TeamDetails'
import TeamServices from '../../services/TeamServices';


const mapStateToProps = state => {
    return {
        team: state.teams.currentTeam
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async fetchTeam(teamId) {
            try {
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetails);