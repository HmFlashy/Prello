import React, { Component } from 'react';
import './Menu.css'
import { Button, Icon, Divider } from 'semantic-ui-react'

class Menu extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div>
                    <p>Ajouter a la carte</p>
                    <Button.Group vertical size='medium' compact>
                        <Button icon labelPosition='left'>
                            <Icon name='users' />
                            Members
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='tag' />
                            Labels
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='check square outline' />
                            Checklist
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='calendar check' />
                            Due date
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='paperclip' />
                            Attachments
                        </Button>
                    </Button.Group>
                </div>
                <Divider />
                <div>
                    <p>Actions</p>
                    <Button.Group vertical size='medium' compact>
                        <Button icon labelPosition='left'>
                            <Icon name='arrow right' />
                            Move
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='copy' />
                            Copy
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='eye' />
                            Watch
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='archive' />
                            Archive
                        </Button>
                        <Button icon labelPosition='left'>
                            <Icon name='share' />
                            Share
                        </Button>
                    </Button.Group>
                </div>
            </div>
        )
    }
}
export default Menu