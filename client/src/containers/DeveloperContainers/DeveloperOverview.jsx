import { connect } from 'react-redux';
import DeveloperOverview from '../../components/App/Developer/DeveloperOverview'
import UserServices from '../../services/UserServices'
import { 
    actionAddingClientApplication, 
    actionClientApplicationAdded, 
    failedActionAddingClientApplication
} from '../../redux/actions/UserActions'

const applications = [
    {
        name: "Test",
        id: "12345",
        secret: "secret",
        redirectUris: ["http://localhost", "https://mesfesse.com"]
    },
    {
        name: "Application2",
        id: "12345",
        secret: "secret",
        redirectUris: ["http://trutr", "https://yes.com"]
    },
    {
        name: "Application3",
        id: "12345",
        secret: "secret",
        redirectUris: ["http://bijour", "https://hello.com"]
    }
]

const mapStateToProps = state => {
    console.log(state.authentification.user)
    return {
        applications: state.authentification.user.client_applications || applications
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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeveloperOverview);