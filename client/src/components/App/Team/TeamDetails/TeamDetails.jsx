import React, { Component } from 'react';
import './TeamDetails.css'
import { Menu, Segment, Container } from 'semantic-ui-react';
import TeamBoards from '../TeamBoards';
import TeamMembers from '../TeamMembers';

class TeamDetails extends Component {

    constructor() {
        super()
        this.state = {
            activeItem: "boards"
        }
        this.handleItemClick = this.handleItemClick.bind(this)
        this.addUsers = this.addUsers.bind(this)
    }

    handleItemClick(e, { name }) {
        this.setState({
            activeItem: name
        })
    }

    addUsers(users) {
        this.props.addUsersToTeam(this.props.team._id, users)
    }

    render() {
        const { activeItem } = this.state
        return (
            <div className="team-layout">
                <div className="team-header">
                    <h1 style={{ fontWeight: "bold" }}>{this.props.team.name}</h1>
                </div>
                <div className="team-content">
                    <Menu attached='top' color="grey" className="menu-content" tabular>
                        <Menu.Item name='boards' active={activeItem === 'boards'} position="center-left" onClick={this.handleItemClick} />
                        <Menu.Item
                            name='members'
                            active={activeItem === 'members'}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name='settings'
                            position="center-right"
                            active={activeItem === 'settings'}
                            onClick={this.handleItemClick}
                        />
                    </Menu>

                    <Segment attached='bottom' className="item-content">
                        <Container className="item-info">
                            {
                                activeItem === "boards" ? <TeamBoards team={this.props.team} /> :
                                    activeItem === "members" ? <TeamMembers addUsers={this.addUsers} team={this.props.team} /> :
                                        activeItem === "settings" ? <div>Settings</div> : <div>Error</div>

                            }
                        </Container>
                    </Segment>
                </div>
            </div>
        )
    }
}

export default TeamDetails