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
            } catch(error){
                dispatch(failedActionLogin())
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(loginForm);