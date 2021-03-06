import React, { Component } from 'react'
import Error404Page from '../../../../pages/ErrorPages/Error404Page'
import Error400Page from '../../../../pages/ErrorPages/Error400Page'
import Error401Page from '../../../../pages/ErrorPages/Error401Page'
import Error403Page from '../../../../pages/ErrorPages/Error403Page'
import Error500Page from '../../../../pages/ErrorPages/Error500Page'

class ErrorLayout extends Component {

    render(){
        const lastError = this.props.errors.pop()
        const errorCode = lastError? lastError.code : null
        return errorCode ?
            (
                errorCode === 401 ? <Error401Page /> :
                errorCode === 403 ? <Error403Page /> :
                errorCode === 404 ? <Error404Page /> :
                errorCode === 500 ? <Error500Page /> :
                <Error400Page />
            ) :
            this.props.children
    }
}

export default ErrorLayout