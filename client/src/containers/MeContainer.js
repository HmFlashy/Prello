import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Me from '../components/App/Me';
import authentificationServices from '../services/AuthentificationServices'
import {
    actionUpdateProfile
} from '../redux/actions/AuthentificationActions'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.authentification.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        async updateProfile(data) {
            try {
                const newUser = await authentificationServices.updateProfile(data)
                dispatch(actionUpdateProfile(newUser))
                return newUser
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Me));