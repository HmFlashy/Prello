import React, { Component } from 'react'
import Error401Page from '../../../../pages/ErrorPages/Error401Page'

class SecureLayout extends Component {

    render(){
        const token = this.props.token
        return !token ?
            <Error401Page /> :
            this.props.children
    }
}

export default SecureLayout