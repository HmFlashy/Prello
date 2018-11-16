import React, { Component } from 'react'
import { withRouter } from 'react-router'

class LoggedOffLayout extends Component {

    render(){
        const token = this.props.token
        return token ? <div>{ this.props.history.push("/home")  }</div>
            :
            this.props.children
    }
}

export default withRouter(LoggedOffLayout)