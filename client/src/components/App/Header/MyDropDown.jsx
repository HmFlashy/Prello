import React from 'react';
import { Icon, Dropdown, Button, Segment } from 'semantic-ui-react'

export default (props) => (
    <Segment>
        {this.state.width > 800 ? <Dropdown button className='icon' floating labeled icon='plus' text='Create'>
            <Dropdown.Menu>
                <Dropdown.Header content='Create' />
                <Dropdown.Divider />
                <Dropdown.Item>Create a board</Dropdown.Item>
                <Dropdown.Item>Create a team</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown> :
            <Dropdown trigger={<Button bordered icon='plus' size='large' />} icon={null} className='icon'>
                <Dropdown.Menu>
                    <Dropdown.Header content='Create' />
                    <Dropdown.Divider />
                    <Dropdown.Item>Create a board</Dropdown.Item>
                    <Dropdown.Item>Create a team</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>}
    </Segment>
)