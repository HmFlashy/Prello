import { connect } from 'react-redux';
import TeamDetails from '../../components/App/Team/TeamDetails'

const mapStateToProps = state => {
    return {
        team: state.teams.currentTeam
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async fetchTeam(teamId) {
            try {
            } catch(error) {
                console.log(error)
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamDetails);