import React, { Component } from 'react'
import HeaderContainer from '../../../../containers/HeaderContainer';
import './HeaderLayout.css'

class HeaderLayout extends Component {

    render(){
        return (
            <div className="header-layout">
                <HeaderContainer />
                { this.props.children }
            </div>
        )
    }
}

export default HeaderLayout