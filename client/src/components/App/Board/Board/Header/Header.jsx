import React, { Component } from 'react';
import './Header.css'
import { Button, Icon } from 'semantic-ui-react'
import Members from '../../../Card/CardDetail/SubComponents/Members'
import CardsArchivedModal from '../CardsArchivedModal';

class BoardHeader extends Component {

    constructor(){
        super()
        this.state = {
            open: false
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render(){
        return (
            <div className="boardHeader">
                <div className="displayRow header-row">
                    <div className="header-board-left">
                        <div className="header-board-name">
                            { this.props.board.name }
                        </div>
                        <div className="header-board-star">
                            <Button icon className="button-header">
                                <Icon name='star' />
                            </Button>
                        </div>
                    </div>
                    <div className="header-board-center">

                    </div>
                    <div className="header-board-archived">
                        <div className="header-board-members">
                        </div>
                        <Button className="button-header" onClick={this.open}>
                            Cards archived
                        </Button>
                        <CardsArchivedModal  
                            open={this.state.open}
                            archivedCards={this.props.archivedCards}
                            onClose={this.close}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardHeader