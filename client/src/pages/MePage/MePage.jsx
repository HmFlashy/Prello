import React, { Component } from 'react'
import SecureLayoutContainer from '../../containers/SecureLayoutContainer';
import MeContainer from '../../containers/MeContainer';
import HeaderLayout from '../../components/App/Layout/HeaderLayout';

class MePage extends Component {

    render() {
        return (
            <SecureLayoutContainer>
                <HeaderLayout>
                    <MeContainer />
                </HeaderLayout>
            </SecureLayoutContainer>
        )
    }
}

export default MePage