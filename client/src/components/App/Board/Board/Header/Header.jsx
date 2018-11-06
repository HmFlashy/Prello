import React, { Component } from 'react';
import './Header.css'
import { Button, Icon } from 'semantic-ui-react'
import Members from '../../../Card/CardDetail/SubComponents/Members'
import CardsArchivedModal from '../CardsArchivedModal';

class BoardHeader extends Component {


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
                            <Members></Members>
                        </div>
                        <CardsArchivedModal  
                            trigger={
                                <Button className="button-header">
                                    Cards archived
                                </Button>
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardHeader