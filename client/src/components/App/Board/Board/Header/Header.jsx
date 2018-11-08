import React, { Component } from 'react';
import './Header.css'
import { Button, Icon } from 'semantic-ui-react'
import Members from '../../../Card/CardDetail/SubComponents/Members'
import CardsArchivedModal from '../CardsArchivedModal';
import Avatar from 'react-avatar';
import BoardLabelsModal from '../BoardLabelsModal'


class BoardHeader extends Component {

    constructor() {
        super()
        this.state = {
            openArchived: false,
            openLabels: false
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
        return (
            <div className="boardHeader">
                <div className="displayRow header-row">
                    <div className="header-board-left">
                        <div className="header-board-name">
                            {this.props.board.name}
                        </div>
                        <div className="header-board-star">
                            <Button icon className="button-header">
                                <Icon name='star' />
                            </Button>
                        </div>
                        <div className="header-board-member">
                            {this.props.members.map(member => <span><Avatar key={member.member._id} name={member.member.fullName} round size="25" textSizeRatio={1.4}></Avatar></span>)}
                        </div>
                    </div>
                    <div className="header-board-center">

                    </div>
                    <div className="header-board-labels">
                    <Button className="button-header" onClick={() => this.setState({ openLabels: true })}>
                            Labels
                            {console.log(this.props.archivedCards)}
                        </Button>
                        <BoardLabelsModal
                            open={this.state.openLabels}
                            boardLabels={this.props.boardLabels}
                            onNewLabel={(newLabelName, newLabelColor) => this.props.newLabel(newLabelName, newLabelColor)}
                            onUpdateLabel={(updatedLabelId, updatedLabelName, updatedLabelColor) => this.props.updateLabel(updatedLabelId, updatedLabelName, updatedLabelColor)}
                            onDeleteLabel={(labelId) => this.props.deleteLabel(labelId)}
                            onClose={() => this.setState({ openLabels: false })}
                        />
                        </div>
                    <div className="header-board-archived">
                        <div className="header-board-members">
                        </div>
                        <Button className="button-header" onClick={() => this.setState({ openArchived: true })}>
                            Cards archived
                        </Button>
                        <CardsArchivedModal
                            open={this.state.openArchived}
                            archivedCards={this.props.archivedCards}
                            onClose={() => this.setState({ openArchived: false })}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardHeader