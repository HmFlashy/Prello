import { connect } from 'react-redux';
import DeveloperOverview from '../../components/App/Developer/DeveloperOverview'
import UserServices from '../../services/UserServices'
import { 
    actionAddingClientApplication, 
    actionClientApplicationAdded, 
    failedActionAddingClientApplication,
    actionAddingURI,
    actionAddURI,
    failedActionAddURI
} from '../../redux/actions/UserActions'

const mapStateToProps = state => {
    console.log(state.authentification.user)
    return {
        applications: state.authentification.user.client_applications
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async addApplication(name){
            try {
                dispatch(actionAddingClientApplication(name))
                const client_app = await UserServices.addClientApplication(name)
                dispatch(actionClientApplicationAdded(client_app))
                return client_app
            } catch(error) {
                dispatch(failedActionAddingClientApplication(error))
            }
        },
        async addURI(clientId, uri){
            try {
                dispatch(actionAddingURI(uri))
                const uri = await UserServices.addURI(clientId, uri)
                dispatch(actionAddURI(uri))
                return uri
            } catch(error) {
                dispatch(failedActionAddURI(error))
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeveloperOverview);