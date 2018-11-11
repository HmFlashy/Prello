import React, { Component } from "react";
import "./Header.css"
import { Button, Divider, Icon, Input, Label, List, Popup } from "semantic-ui-react"
import Members from "../../../Card/CardDetail/SubComponents/Members"
import CardsArchivedModal from "../CardsArchivedModal";
import Avatar from "../../../Avatar";
import BoardLabelsModal from "../BoardLabelsModal"

class BoardHeader extends Component {

    constructor() {
        super();
        this.state = {
            openArchived: false,
            openLabels: false,
            isHoverStar: false,
            isFilterOpen: false,
            isMemberOpen: false,
            searchMember: ""
        };
        this.open = this.open.bind(this);
        this.overStar = this.overStar.bind(this);
        this.unOverStar = this.unOverStar.bind(this);
        this.starBoard = this.starBoard.bind(this);
        this.close = this.close.bind(this);
        this.clickLabel = this.clickLabel.bind(this);
        this.clickMember = this.clickMember.bind(this);
        this.handleChangeSearchFilter = this.handleChangeSearchFilter.bind(this);
        this.switchFilterMode = this.switchFilterMode.bind(this);
        this.clickDueDate = this.clickDueDate.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.openMembersPopup = this.openMembersPopup.bind(this);
        this.handleCloseFilter = this.handleCloseFilter.bind(this);
        this.handleCloseMember = this.handleCloseFilter.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleOpenMember = this.handleOpenMember.bind(this);
        this.handleChangeSearchMember = this.handleChangeSearchMember.bind(this);
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

    handleOpenFilter = () => {
        this.setState({
            isFilterOpen: true
        })
    };

    handleCloseFilter = () => {
        this.setState({
            isFilterOpen: false
        })
    };

    handleOpenMember = () => {
        this.setState({
            isMemberOpen: true
        })
    };

    handleCloseMember = () => {
        this.setState({
            isMemberOpen: false
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

    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    handleChangeSearchFilter(e, { value }) {
        this.props.updateSearchFilter(value);
    }

    handleChangeSearchMember(e, { value }) {
        this.setState({
            searchMember: value
        })
    };

    switchFilterMode(e) {
        if (e.target.id !== this.props.board.filterMode) {
            this.props.switchFilterMode(e.target.id)
        }
    }

    clickDueDate(e) {
        if (e.target.id !== this.props.board.dueDateMode) {
            this.props.switchDueDateMode(e.target.id)
        } else {
            this.props.switchDueDateMode("")
        }
    }

    clearFilter() {
        this.props.clearFilter();
    }

    openMembersPopup() {
        this.setState({
            isMemberOpen: true
        })
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
                                        || (this.props.isStarred && !this.state.isHoverStar) ? "star" : "star outline"} />
                            </Button>
                        </div>
                        <div className="header-board-member">
                            {this.props.board.members.map(member => <span><Avatar
                                _id={member.member._id}
                                fullName={member.member.fullName}
                                bio={member.member.bio}
                                round
                                size="25"
                                textSizeRatio={1.4} /></span>)}
                            <Popup
                                className={"add-member-popup"}
                                trigger={<Icon name={"add user"} />}
                                on='click'
                                open={this.state.isMemberOpen}
                                onClose={() => this.setState({ isMemberOpen: false })}
                                onOpen={() => this.setState({ isMemberOpen: true })}
                                position='bottom left'>
                                <div>
                                    <Input className={"search-bar"} placeholder={"Search"}
                                           value={this.state.searchMember}
                                           onChange={this.handleChangeSearchMember} />
                                    <Divider />
                                </div>
                            </Popup>
                        </div>
                    </div>
                    <div className={"header-board-filter"}>
                        <Popup
                            className={"filter-popup"}
                            trigger={<Button className={"button-header"} content='Filter' />}
                            on='click'
                            open={this.state.isFilterOpen}
                            onClose={() => this.setState({ isFilterOpen: false })}
                            onOpen={() => this.setState({ isFilterOpen: true })}
                            position='bottom right'>
                            <div className={"filters-list"}>
                                <Input className={"search-bar"} placeholder={"Search"}
                                    value={this.props.board.searchFilter}
                                    onChange={this.handleChangeSearchFilter} />
                                <Divider />
                                <List className={"list"}>
                                    <List.Item className={"filter-list"}>
                                        <Label className={"filter-item"} id={"No Labels"} color={"#008080"}
                                            onClick={this.clickLabel}>
                                            <div id={"No Labels"} className={"filter-name"}>No Labels</div>
                                            <Icon className={"filter-item-icon"} id={"No Labels"}
                                                name={this.props.board.labelsFilter.includes("No Labels") ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    {this.props.board.labels.map(label =>
                                        <List.Item className={"filter-list"}>
                                            <Label className={"filter-item"} id={label._id} color={label.color}
                                                onClick={this.clickLabel}>
                                                <div id={label._id} className={"filter-name"}>{label.name}</div>
                                                <Icon className={"filter-item-icon"} id={label._id}
                                                    name={this.props.board.labelsFilter.includes(label._id) ? "check" : ""} />
                                            </Label>
                                        </List.Item>
                                    )}
                                </List>
                                <Divider />
                                <List className={"list"}>
                                    <List.Item className={"filter-list"}>
                                        <Label className={"filter-item"} id={"No Members"} color={"#008080"}
                                            onClick={this.clickMember}>
                                            <span className={"member-avatar"} id={"No Members"}><Avatar id={"No Members"}
                                                _id={"No Members"}
                                                fullName={"No Members"}
                                                key={"No Members"}
                                                name={"?"}
                                                color={"gray"}
                                                round
                                                size="25"
                                                textSizeRatio={1.8} /></span>
                                            <div className={"filter-name"} id={"No Members"}> No Members</div>
                                            <Icon id={"No Members"} className={"filter-item-icon"}
                                                name={this.props.board.membersFilter.includes("No Members") ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    {this.props.board.members.map(boardMember =>
                                        <List.Item className={"filter-list"}>
                                            <Label className={"filter-item"} id={boardMember.member._id}
                                                onClick={this.clickMember}>
                                                <span className={"member-avatar"} id={boardMember.member._id}><Avatar id={boardMember.member._id}
                                                    _id={boardMember.member._id}
                                                    fullName={boardMember.member.fullName}
                                                    bio={boardMember.member.bio}
                                                    key={boardMember.member._id}
                                                    name={boardMember.member.fullName}
                                                    round
                                                    size="25"
                                                    textSizeRatio={1.4} /></span>
                                                <div id={boardMember.member._id} className={"filter-name"}> {`${boardMember.member.fullName} (${boardMember.member.username})`}</div>
                                                <Icon id={boardMember.member._id} className={"filter-item-icon"}
                                                    name={this.props.board.membersFilter.includes(boardMember.member._id) ? "check" : ""} />
                                            </Label>
                                        </List.Item>
                                    )}
                                </List>
                                <Divider />
                                <List className={"filter-list"}>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_THIS_DAY"} onClick={this.clickDueDate}>
                                            <div id={"DUE_THIS_DAY"} className={"filter-name"}>Due this day</div>
                                            <Icon id={"DUE_THIS_DAY"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_THIS_DAY" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_NEXT_DAY"} onClick={this.clickDueDate}>
                                            <div id={"DUE_NEXT_DAY"} className={"filter-name"}>Due next day</div>
                                            <Icon id={"DUE_NEXT_DAY"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_NEXT_DAY" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_NEXT_WEEK"} onClick={this.clickDueDate}>
                                            <div id={"DUE_NEXT_WEEK"} className={"filter-name"}>Due next week</div>
                                            <Icon id={"DUE_NEXT_WEEK"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_NEXT_WEEK" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_NEXT_MONTH"} onClick={this.clickDueDate}>
                                            <div id={"DUE_NEXT_MONTH"} className={"filter-name"}>Due next month</div>
                                            <Icon id={"DUE_NEXT_MONTH"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_NEXT_MONTH" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"NO_DUE_DATE"} onClick={this.clickDueDate}>
                                            <div id={"NO_DUE_DATE"} className={"filter-name"}>No due date</div>
                                            <Icon id={"NO_DUE_DATE"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "NO_DUE_DATE" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_DATE_MARKED_COMPLETED"} onClick={this.clickDueDate}>
                                            <div id={"DUE_DATE_MARKED_COMPLETED"} className={"filter-name"}>Due date marked as completed</div>
                                            <Icon id={"DUE_DATE_MARKED_COMPLETED"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_DATE_MARKED_COMPLETED" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_DATE_NOT_MARKED_COMPLETED"} onClick={this.clickDueDate}>
                                            <div id={"DUE_DATE_NOT_MARKED_COMPLETED"} className={"filter-name"}>Due date not marked as completed</div>
                                            <Icon id={"DUE_DATE_NOT_MARKED_COMPLETED"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_DATE_NOT_MARKED_COMPLETED" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"OVERDUE"} onClick={this.clickDueDate}>
                                            <div id={"OVERDUE"} className={"filter-name"}>Overdue</div>
                                            <Icon id={"OVERDUE"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "OVERDUE" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                </List>
                                <Divider />
                                <List>
                                    <List.Item className={"filter-list"}>
                                        <Label className={"filter-item"} id={"UNION"} onClick={this.switchFilterMode}>
                                            <div id={"UNION"} className={"filter-name"}>Matches any label and any member</div>
                                            <Icon id={"UNION"} className={"filter-item-icon"}
                                                name={this.props.board.filterMode === "UNION" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item className={"filter-list"}>
                                        <Label className={"filter-item"} id={"INTERSECTION"} onClick={this.switchFilterMode}>
                                            <div id={"INTERSECTION"} className={"filter-name"}>Matches any label and any member</div>
                                            <Icon id={"INTERSECTION"} className={"filter-item-icon"}
                                                name={this.props.board.filterMode === "INTERSECTION" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                </List>
                                <Divider />
                                <div className={"clear-filter"} onClick={this.clearFilter}>Clear Filter</div>
                            </div>
                        </Popup>
                    </div>
                    <div className="header-board-labels">
                        <Button className="button-header" onClick={() => this.setState({ openLabels: true })}>
                            Labels
                        </Button>
                        <BoardLabelsModal
                            open={this.state.openLabels}
                            boardLabels={this.props.board.labels}
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