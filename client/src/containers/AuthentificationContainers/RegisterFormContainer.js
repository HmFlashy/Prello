import { connect } from 'react-redux';
import registerForm from './../../components/App/Form/RegisterForm'
import authentificationServices from '../../services/AuthentificationServices'
import {
    actionRegistering,
    actionRegistered,
    failedActionRegister
} from '../../redux/actions/AuthentificationActions'

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async register(credentials){
            try {  
                dispatch(actionRegistering())
                const newUser = await authentificationServices.register(credentials)
                dispatch(actionRegistered(newUser))
                return newUser
            } catch(error) {
                dispatch(failedActionRegister(error))
                throw error
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(registerForm);