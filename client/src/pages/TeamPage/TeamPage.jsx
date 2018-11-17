import React, { Component } from 'react'
import SecureLayoutContainer from '../../containers/SecureLayoutContainer';
import TeamDetailsContainer from '../../containers/TeamContainers/TeamDetailsContainer';
import HeaderLayout from '../../components/App/Layout/HeaderLayout';

class TeamPage extends Component {

    render() {
        return (
            <SecureLayoutContainer>
                <HeaderLayout>
                    <TeamDetailsContainer 
                    teamId={this.props.match.params.teamId}
                    />
                </HeaderLayout>
            </SecureLayoutContainer>
            
        )
    }
}

export default TeamPage