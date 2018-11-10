import React, {Component} from "react";
import "./Header.css"
import {Button, Icon, Input, Label, List, Popup} from "semantic-ui-react"
import Members from "../../../Card/CardDetail/SubComponents/Members"
import CardsArchivedModal from "../CardsArchivedModal";
import Avatar from "react-avatar";
import BoardLabelsModal from "../BoardLabelsModal"

class BoardHeader extends Component {

    constructor() {
        super();
        this.state = {
            openArchived: false,
            openLabels: false,
            isHoverStar: false,
            isFilterOpen: false
        };
        this.open = this.open.bind(this);
        this.overStar = this.overStar.bind(this);
        this.unOverStar = this.unOverStar.bind(this);
        this.starBoard = this.starBoard.bind(this);
        this.close = this.close.bind(this);
        this.clickLabel = this.clickLabel.bind(this);
        this.clickMember = this.clickMember.bind(this)
        this.handleChangeSearchFilter = this.handleChangeSearchFilter.bind(this)
    }

    overStar() {
        this.setState({
            isHoverStar: true
        })
    }

    unOverStar() {
        this.setState({
            isHoverStar: false
        })
    }

    starBoard(event) {
        event.stopPropagation();
        if (this.props.isStarred) {
            this.props.unstarBoard(this.props.board._id, this.props.userId)
        } else {
            this.props.starBoard(this.props.board._id, this.props.userId)
        }
    }

    handleOpen = () => {
        this.setState({
            isFilterOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            isFilterOpen: false
        })
    };

    clickLabel(event) {
        if (this.props.board.labelsFilter.includes(event.target.id)) {
            this.props.removeLabelFilter(event.target.id)
        } else {
            this.props.addLabelFilter(event.target.id)
        }
    }

    clickMember(event) {
        if (this.props.board.membersFilter.includes(event.target.id)) {
            this.props.removeMemberFilter(event.target.id)
        } else {
            this.props.addMemberFilter(event.target.id)
        }
    }

    open = () => this.setState({open: true});
    close = () => this.setState({open: false});

    handleChangeSearchFilter(e, {value}) {
        this.props.updateSearchFilter(value);
    }

    render() {
        return (
            <div className="boardHeader">
                <div className="displayRow header-row">
                    <div className="header-board-left">
                        <div className="header-board-name">
                            {this.props.board.name}
                        </div>
                        <div className="header-board-star">
                            <Button icon className="button-header"
                                    onClick={this.starBoard}
                                    onMouseEnter={this.overStar}
                                    onMouseOut={this.unOverStar}>
                                <Icon className="bo-icon"
                                      onMouseEnter={this.overStar}
                                      onMouseOut={this.unOverStar}
                                      color={(!this.props.isStarred && this.state.isHoverStar)
                                      || (this.props.isStarred && !this.state.isHoverStar) ? "yellow" : "white"}
                                      name={(!this.props.isStarred && this.state.isHoverStar)
                                      || (this.props.isStarred && !this.state.isHoverStar) ? "star" : "star outline"}/>
                            </Button>
                        </div>
                        <div className="header-board-member">
                            {this.props.board.members.map(member => <span><Avatar key={member.member._id}
                                                                                  name={member.member.fullName} round
                                                                                  size="25"
                                                                                  textSizeRatio={1.4}/></span>)}
                        </div>
                    </div>
                    <div className={"header-board-filter"}>
                        <Popup
                            className={"filter-popup"}
                            trigger={<Button className={"button-header"} content='Filter'/>}
                            on='click'
                            open={this.state.isFilterOpen}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            position='bottom right'>
                            <div>
                                <Input className={"search-bar"} placeholder={"Search"} value={this.props.board.searchFilter}
                                       onChange={this.handleChangeSearchFilter}/>
                                <List className={"list"}>
                                    Filter by labels...
                                    <List.Item className={"filter-list"}>
                                        <Label className={"filter-item"} id={"No Labels"} color={"#008080"}
                                               onClick={this.clickLabel}>
                                            No Labels
                                            <Icon id={"No Labels"}
                                                  name={this.props.board.labelsFilter.includes("No Labels") ? "check" : ""}/>
                                        </Label>
                                    </List.Item>
                                    {this.props.board.labels.map(label =>
                                        <List.Item className={"filter-list"}>
                                            <Label className={"filter-item"} id={label._id} color={label.color}
                                                   onClick={this.clickLabel}>
                                                {label.name}
                                                <Icon id={label._id}
                                                      name={this.props.board.labelsFilter.includes(label._id) ? "check" : ""}/>
                                            </Label>
                                        </List.Item>
                                    )}
                                </List>
                                <List className={"list"}>
                                    Filter by members...
                                    <List.Item className={"filter-list"}>
                                        <Label className={"filter-item"} id={"No Members"} color={"#008080"}
                                               onClick={this.clickMember}>
                                            No Members
                                            <Icon id={"No Members"}
                                                  name={this.props.board.membersFilter.includes("No Members") ? "check" : ""}/>
                                        </Label>
                                    </List.Item>
                                    {this.props.board.members.map(boardMember =>
                                        <List.Item className={"filter-list"}>
                                            <Label className={"filter-item"} id={boardMember.member._id}
                                                   onClick={this.clickMember}>
                                            <span id={boardMember.member._id}><Avatar id={boardMember.member._id}
                                                                                      key={boardMember.member._id}
                                                                                      name={boardMember.member.fullName}
                                                                                      round
                                                                                      size="25"
                                                                                      textSizeRatio={1.4}/></span>
                                                {`${boardMember.member.fullName} (${boardMember.member.username})`}
                                                <Icon id={boardMember.member._id}
                                                      name={this.props.board.membersFilter.includes(boardMember.member._id) ? "check" : ""}/>
                                            </Label>
                                        </List.Item>
                                    )}
                                </List>
                            </div>
                        </Popup>
                    </div>
                    <div className="header-board-labels">
                        <Button className="button-header" onClick={() => this.setState({openLabels: true})}>
                            Labels
                        </Button>
                        <BoardLabelsModal
                            open={this.state.openLabels}
                            boardLabels={this.props.board.labels}
                            onNewLabel={(newLabelName, newLabelColor) => this.props.newLabel(newLabelName, newLabelColor)}
                            onUpdateLabel={(updatedLabelId, updatedLabelName, updatedLabelColor) => this.props.updateLabel(updatedLabelId, updatedLabelName, updatedLabelColor)}
                            onDeleteLabel={(labelId) => this.props.deleteLabel(labelId)}
                            onClose={() => this.setState({openLabels: false})}
                        />
                    </div>
                    <div className="header-board-archived">
                        <div className="header-board-members">
                        </div>
                        <Button className="button-header" onClick={() => this.setState({openArchived: true})}>
                            Cards archived
                        </Button>
                        <CardsArchivedModal
                            open={this.state.openArchived}
                            archivedCards={this.props.archivedCards}
                            onClose={() => this.setState({openArchived: false})}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardHeader