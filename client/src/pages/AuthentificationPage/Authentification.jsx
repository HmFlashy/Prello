import './Authentification.css'
import React, { Component } from 'react'
import LoginFormContainer from '../../containers/AuthentificationContainers/LoginFormContainer';
import RegisterFormContainer from '../../containers/AuthentificationContainers/RegisterFormContainer';

class AuthentificationPage extends Component {

    render(){
        return this.props.location.pathname === "/register" ? <RegisterFormContainer /> : <LoginFormContainer />
    }
}

export default AuthentificationPage