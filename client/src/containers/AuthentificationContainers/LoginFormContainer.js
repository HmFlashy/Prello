import { connect } from 'react-redux';
import loginForm from './../../components/App/Form/LoginForm'
import authentificationServices from '../../services/AuthentificationServices'
import {
    actionLogin,
    actionLoggedIn,
    failedActionLogin
} from '../../redux/actions/AuthentificationActions'

const mapStateToProps = state => {
    return {
        error: state.authentification.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        async authenticate(email, password){
            try {
                dispatch(actionLogin(email))
                const data = await authentificationServices.authenticate(email, password)
                localStorage.setItem('token-prello', data.token)
                dispatch(actionLoggedIn(data))
                return data
            } catch(error){
                switch(error.data){
                    case 'EMAIL_MALFORMED':
                        dispatch(failedActionLogin("Wrong email address"))
                        break;
                    case 'UNKNOWN_EMAIL':
                        dispatch(failedActionLogin("Unknown email address"))
                        break;
                    case 'WRONG_PASSWORD':
                        dispatch(failedActionLogin("Wrong password"))
                        break;
                    default:
                        break;
                }
                
                throw error
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(loginForm);