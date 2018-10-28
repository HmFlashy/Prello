import './Authentification.css'
import React, { Component } from 'react'
import LoginFormContainer from '../../containers/AuthentificationContainers/LoginFormContainer';
import RegisterFormContainer from '../../containers/AuthentificationContainers/RegisterFormContainer';

class Authentification extends Component {

    constructor(){
        super()
    }

    render(){
        return this.props.location.pathname === "/register" ? <LoginFormContainer /> : <RegisterFormContainer />
    }
}

export default Authentification