import React, { Component } from 'react';
import './Header.css'
import { Segment, Icon, Divider, TextArea, Dropdown, Button, Search } from 'semantic-ui-react'

class Header extends Component {

    render() {
        return (
            <Segment inverted color='teal' className="inline header" size='mini'>
                <div className="inline">
                    <Button icon='home' />
                    <Dropdown text='Boards' icon='flipboard' floating labeled button className='icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header icon='tags' content='Boards' />
                            <Dropdown.Item>Important</Dropdown.Item>
                            <Dropdown.Item>Announcement</Dropdown.Item>
                            <Dropdown.Item>Discussion</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Search results={[{ title: "yo", description: "mdr" }]} size="small" className="search"></Search>
                </div>
                <div>
                    <p className="appname">Prello</p>
                </div>
                <div className="inline">
                    <Dropdown
                        button
                        className='icon'
                        floating
                        labeled
                        icon='plus'
                        options={[{ key: 'Arabic', text: 'Arabic', value: 'Arabic' }]}
                        text='Create'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='Create' />
                            <Dropdown.Divider />
                            <Dropdown.Item>Create a board</Dropdown.Item>
                            <Dropdown.Item>Create a team</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                        button
                        className='icon'
                        floating
                        labeled
                        icon='bell outline'
                        options={[{ key: 'Arabic', text: 'Arabic', value: 'Arabic' }]}
                        text='Notifications'
                    />
                    <Dropdown
                        button
                        className='icon'
                        floating
                        labeled
                        icon='user outline'
                        text='User'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='name' />
                            <Dropdown.Divider />
                            <Dropdown.Item>Profile</Dropdown.Item>
                            <Dropdown.Item>Cards</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>Change language</Dropdown.Item>
                            <Dropdown.Item>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Segment>
        )
    }
}

export default Header
