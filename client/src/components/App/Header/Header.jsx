import React, { Component } from 'react';
import './Header.css'
import { Segment, Dropdown, Button, Search } from 'semantic-ui-react'
import { withRouter } from 'react-router';

class Header extends Component {

    constructor() {
        super()
        this.state = {
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.goHome = this.goHome.bind(this);
        this.changeBoard = this.changeBoard.bind(this)
    }

    componentDidMount() {
        this.props.fetchBoards()
        this.props.getProfile()
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

    goHome(){
        this.props.fetchBoards()
        this.nextPath('/home')
    }

    changeBoard(nextBoardId){
        this.props.unsubscribe(this.props.boardId)
        this.props.fetchBoard(nextBoardId) 
        this.nextPath(`/boards/${nextBoardId}`)
        this.props.subscribe(nextBoardId)
    }

    render() {
        return (
            <Segment inverted className="inline app-header" size='mini'>
                <div className="inline header-left">
                    <div>
                        <Button icon='home' onClick={this.goHome} />
                        {
                            this.state.width > 800 ? 
                                <Dropdown text='Boards' icon='flipboard' floating labeled button className='icon'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='tags' content='Boards' />
                                        {this.props.boards.map(board => <Dropdown.Item key={board._id} onClick={() => { this.changeBoard(board._id) }}>{board.name}</Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown> 
                                :
                                <Dropdown trigger={<Button icon='flipboard' size='medium' />} icon={null} className='icon'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header icon='tags' content='Boards' />
                                        {this.props.boards.map(board => <Dropdown.Item key={board._id} onClick={() => { this.changeBoard(board._id) }}>{board.name}</Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                        }
                        {/*<Search results={[{ title: "yo", description: "mdr" }]} size="small" className="search"></Search>*/}
                    </div>
                </div>
                <div className="header-center">
                    <img className="header-center-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ITunes_12.2_logo.png/768px-ITunes_12.2_logo.png"></img>
                </div>
                <div className="header-right">
                    { /*
                    {this.state.width > 1000 ? <Dropdown button className='icon' floating labeled icon='plus' text='Create'>
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
                    {this.state.width > 1000
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
                */}
                </div>
            </Segment>
        )
    }
}

export default withRouter(Header)
