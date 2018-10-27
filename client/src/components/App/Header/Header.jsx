import React, { Component } from 'react';
import './Header.css'
import { Segment, Dropdown, Button, Search, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import Board from '../Board/Board';

class Header extends Component {

    constructor() {
        super()
        this.state = {
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.props.fetchBoards()
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <Segment inverted color='teal' className="inline header" size='mini'>
                <div className="inline">
                    <Button icon='home' onClick={() => this.nextPath('/login')} />
                    {
                        this.state.width > 800 ? 
                            <Dropdown text='Boards' icon='flipboard' floating labeled button className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header icon='tags' content='Boards' />
                                    {this.props.boards.map(board => <Dropdown.Item key={board._id} onClick={() => { this.nextPath(`/boards/${board._id}`); this.props.fetchBoard(board._id) }}>{board.name}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown> 
                            :
                            <Dropdown trigger={<Button icon='flipboard' size='medium' />} icon={null} className='icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header icon='tags' content='Boards' />
                                    {this.props.boards.map(board => <Dropdown.Item key={board._id} onClick={() => { this.nextPath(`/boards/${board._id}`); this.props.fetchBoard(board._id) }}>{board.name}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                    }
                    <Search results={[{ title: "yo", description: "mdr" }]} size="small" className="search"></Search>
                </div>
                <div>
                    <p className="appname">Prello</p>
                </div>
                <div className="inline">
                    {this.state.width > 800 ? <Dropdown button className='icon' floating labeled icon='plus' text='Create'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='Create' />
                            <Dropdown.Divider />
                            <Dropdown.Item>Create a board</Dropdown.Item>
                            <Dropdown.Item>Create a team</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> :
                        <Dropdown trigger={<Button icon='plus' size='medium' />} icon={null} className='icon'>
                            <Dropdown.Menu>
                                <Dropdown.Header content='Create' />
                                <Dropdown.Divider />
                                <Dropdown.Item>Create a board</Dropdown.Item>
                                <Dropdown.Item>Create a team</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>}
                    {this.state.width > 800
                        ? <Dropdown button className='icon' floating labeled icon='bell outline' text='Notifications' />
                        : <Dropdown trigger={<Button icon='bell outline' size='medium' />} icon={null} className='icon' />
                    }
                    {this.state.width > 800
                        ? <Dropdown button className='icon' floating labeled icon='user outline' text='User'>
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
                        : <Dropdown trigger={<Button icon='user outline' size='medium' />} icon={null} className='icon'>
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
                    }

                </div>
            </Segment>
        )
    }
}

export default withRouter(Header)
