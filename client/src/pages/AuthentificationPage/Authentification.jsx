import './Authentification.css'
import React, { Component } from 'react'
import LoginFormContainer from '../../containers/AuthentificationContainers/LoginFormContainer';
import RegisterFormContainer from '../../containers/AuthentificationContainers/RegisterFormContainer';
import LoggedOffLayoutContainer from '../../containers/LoggedOffLayoutContainer';

class AuthentificationPage extends Component {

    render(){
        return (
            <LoggedOffLayoutContainer>
            {
                this.props.location.pathname === "/register" ? <RegisterFormContainer /> : <LoginFormContainer />
            }
            </LoggedOffLayoutContainer>
        )
    }
}

export default AuthentificationPage