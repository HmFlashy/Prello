import React, { Component } from 'react';
import './Header.css'
import { Segment, Dropdown, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import Avatar from "../Avatar"
import AuthentificationServices from '../../../services/AuthentificationServices';

class Header extends Component {

    constructor() {
        super()
        this.state = {
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.goHome = this.goHome.bind(this);
        this.goProfile = this.goProfile.bind(this);
        this.changeBoard = this.changeBoard.bind(this)
        this.logout = this.logout.bind(this)
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

    goHome() {
        this.props.fetchBoards()
        this.nextPath('/home')
    }

    goProfile() {
        this.nextPath('/me')
    }

    changeBoard(nextBoardId) {
        this.props.unsubscribe(this.props.boardId)
        this.props.fetchBoard(nextBoardId)
        this.nextPath(`/boards/${nextBoardId}`)
        this.props.subscribe(nextBoardId)
    }

    logout() {
        AuthentificationServices.logout()
        this.props.logout()
    }

    render() {
        return (
            <Segment inverted className="inline app-header" size='mini'>
                <div className="inline header-left">
                    <Button icon='home' onClick={this.goHome} />
                    {
                        this.state.width > 800 ?
                            <Dropdown text='Boards' icon='flipboard' floating labeled button className='icon' scrolling>
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
                </div>
                <div className="header-center">
                    <img className="header-center-image" src="http://image.noelshack.com/fichiers/2018/45/3/1541618482-logoprello.png"></img>
                </div>
                <div className="header-right">
                    <div className="elements">
                        <div className="truc" onClick={this.goProfile}>
                            <Avatar
                                _id={this.props.user._id}
                                fullName={this.props.user.fullName}
                                bio={this.props.user.bio}
                                round
                                size="40"
                                textSizeRatio={1.4} />
                        </div>
                        <div className="truc">
                            <Button color="red" onClick={this.logout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </Segment>
        )
    }
}

export default withRouter(Header)
