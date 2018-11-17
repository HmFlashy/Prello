import React, { Component } from "react";
import "./Header.css"
import { Button, Divider, Dropdown, Icon, Input, Label, List, Popup } from "semantic-ui-react"
import CardsArchivedModal from "../CardsArchivedModal";
import PollContainer from "../../../../../containers/BoardContainer/PollContainer";
import Avatar from "../../../Avatar";
import BoardLabelsModal from "../BoardLabelsModal"
import DynamicInput from "../../../Input/DynamicInput"
import axios from 'axios'
import UrlConfig from '../../../../../config/UrlConfig'
import { tokenHeader } from '../../../../../helpers/HeaderHelper'

class BoardHeader extends Component {

    constructor() {
        super();
        this.state = {
            openArchived: false,
            openLabels: false,
            isHoverStar: false,
            isFilterOpen: false,
            isMemberOpen: false,
            isTeamOpen: false,
            searchMember: "",
            currentMembersValues: [],
            currentMembers: [],
            currentTeamsValues: [],
            currentTeams: []
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
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleChangeSearchMember = this.handleChangeSearchMember.bind(this);
        this.getSearchedMembersOptions = this.getSearchedMembersOptions.bind(this);
        this.handleChangeMembers = this.handleChangeMembers.bind(this);
        this.addMembers = this.addMembers.bind(this);
        this.addTeams = this.addTeams.bind(this);
        this.openTeamsPopup = this.openTeamsPopup.bind(this);
        this.getSearchedTeamsOptions = this.getSearchedTeamsOptions.bind(this);
        this.handleChangeSearchTeam = this.handleChangeSearchTeam.bind(this);
        this.handleChangeTeams = this.handleChangeTeams.bind(this);
        this.openMemberDetails = this.openMemberDetails.bind(this);
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

    switchFilterMode(e) {
        if (e.target.id !== this.props.board.filterMode) {
            this.props.switchFilterMode(e.target.id)
        }
    }

    clearFilter() {
        this.props.clearFilter();
    }

    handleChangeSearchMember(e) {
        this.setState({
            searchMember: e.target.value
        });
        this.props.fetchMembers(this.props.board._id, e.target.value);
    };

    handleChangeMembers(e, { value }) {
        let currentMembers = [];
        value.forEach(selectedValue => {
            const valueFound = this.getSearchedMembersOptions().find(s => s.value === selectedValue);
            currentMembers.push(valueFound);
        });
        this.setState({
            currentMembersValues: value,
            currentMembers: currentMembers
        })
    }

    clickDueDate(e) {
        if (e.target.id !== this.props.board.dueDateMode) {
            this.props.switchDueDateMode(e.target.id)
        } else {
            this.props.switchDueDateMode("")
        }
    }

    openMembersPopup() {
        this.setState({
            isMemberOpen: true,
            isTeamOpen: false
        });
        this.props.fetchingMissingMembers();
    }

    getSearchedMembersOptions() {
        const members = this.state.searchMember.length > 0 ? this.props.membersSearched : this.props.missingMembers;
        return [...members.map(member => {
            return {
                key: member._id,
                value: member.fullName,
                text: member.fullName,
                content: <span className={"dropdown-member-item"} id={member._id}><Avatar
                    _id={member._id}
                    fullName={member.fullName}
                    bio={member.bio}
                    round
                    size="25"
                    textSizeRatio={1.4} />
                    <div id={member._id}> {member.fullName}</div></span>
            }
        }), ...this.state.currentMembers];
    }

    addMembers() {
        this.props.addMembers(this.props.board._id, this.state.currentMembers.map(member => member.key));
        this.setState({
            currentMembers: [],
            currentMembersValues: []
        })
    }

    openTeamsPopup() {
        this.setState({
            isMemberOpen: false,
            isTeamOpen: true
        });
    }

    addTeams() {
        this.props.addTeams(this.props.board._id, this.state.currentTeams.map(team => team.key));
        this.setState({
            currentTeams: [],
            currentTeamsValues: []
        })
    }

    getSearchedTeamsOptions() {
        return [...this.props.teamsSearched.map(team => {
            return {
                key: team._id,
                value: team.name,
                text: team.name,
                content: <span className={"dropdown-member-item"} id={team._id}><Avatar
                    _id={team._id}
                    fullName={team.name}
                    round
                    size="25"
                    textSizeRatio={1.4} />
                    <div id={team._id}> {team.name}</div></span>
            }
        }), ...this.state.currentTeams];
    }

    handleChangeTeams(e, { value }) {
        let currentTeams = [];
        value.forEach(selectedValue => {
            const valueFound = this.getSearchedTeamsOptions().find(s => s.value === selectedValue);
            currentTeams.push(valueFound);
        });
        this.setState({
            currentTeamsValues: value,
            currentTeams: currentTeams
        })
    }

    handleChangeSearchTeam(e) {
        this.setState({
            searchTeam: e.target.value
        });
        this.props.fetchTeams(this.props.board._id, e.target.value);
    };

    openMemberDetails(e) {
        console.log(e.target.value)
    }

    render() {
        return (
            <div className="boardHeader">
                <div className="displayRow header-row">
                    <div className="header-board-left">
                        <div className="header-board-name">
                            <DynamicInput
                                type='text'
                                textToDisplay={this.props.board.name}
                                placeholder={this.props.board.name}
                                onValidate={(name) => this.props.updateName(this.props.board._id, this.props.board.name, name.target.value)}
                            />
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
                            {this.props.board.teams.map(team => <span><Avatar
                                _id={team._id}
                                fullName={team.name}
                                round
                                size="25"
                                textSizeRatio={1.8} /></span>)}
                            <Popup
                                flowing={true}
                                trigger={<Icon name={"add team"} />}
                                on='click'
                                open={this.state.isTeamOpen}
                                onClose={() => this.setState({ isTeamOpen: false })}
                                onOpen={() => this.openTeamsPopup()}
                                position='bottom left'>
                                <div className={"add-team-button"}>
                                    <Button icon="add" onClick={this.addTeams} positive content={"Add"} />
                                </div>
                                <Divider />
                                <div className={"dropdown-add-team"}>
                                    <Dropdown
                                        loading={this.props.isFetchingTeams}
                                        open
                                        flowing={true}
                                        options={this.getSearchedTeamsOptions()}
                                        placeholder='Search a team'
                                        selection
                                        search
                                        clearable
                                        fluid
                                        multiple
                                        value={this.state.currentTeamsValues}
                                        onChange={this.handleChangeTeams}
                                        onSearchChange={this.handleChangeSearchTeam}
                                    />
                                </div>
                            </Popup>
                        </div>
                        <div className="header-board-member">
                            {console.log(this.props.board.members)}
                            {this.props.board.members.map(boardMember => <span
                                onClick={this.openMemberDetails}
                                key={boardMember.member._id}><Avatar
                                _id={boardMember.member._id}
                                fullName={boardMember.member.fullName}
                                bio={boardMember.member.bio}
                                round
                                size="25"
                                textSizeRatio={1.4}/></span>)}
                            <Popup
                                flowing={true}
                                trigger={<Icon name={"add user"} />}
                                on='click'
                                open={this.state.isMemberOpen}
                                onClose={() => this.setState({ isMemberOpen: false })}
                                onOpen={() => this.openMembersPopup()}
                                position='bottom left'>
                                <div className={"add-member-button"}>
                                    <Button icon="add" onClick={this.addMembers} positive content={"Add"} />
                                </div>
                                <Divider />
                                <div className={"dropdown-add-member"}>
                                    <Dropdown
                                        open
                                        loading={this.props.isFetchingMembers}
                                        flowing={true}
                                        options={this.getSearchedMembersOptions()}
                                        placeholder='Search a member'
                                        selection
                                        search
                                        clearable
                                        fluid
                                        multiple
                                        value={this.state.currentMembersValues}
                                        onChange={this.handleChangeMembers}
                                        onSearchChange={this.handleChangeSearchMember}
                                    />
                                </div>
                            </Popup>
                        </div>
                    </div>
                    <PollContainer></PollContainer>
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
                                            <span className={"member-avatar"} id={"No Members"}><Avatar
                                                id={"No Members"}
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
                                                <span className={"member-avatar"} id={boardMember.member._id}><Avatar
                                                    id={boardMember.member._id}
                                                    _id={boardMember.member._id}
                                                    fullName={boardMember.member.fullName}
                                                    bio={boardMember.member.bio}
                                                    key={boardMember.member._id}
                                                    name={boardMember.member.fullName}
                                                    round
                                                    size="25"
                                                    textSizeRatio={1.4} /></span>
                                                <div id={boardMember.member._id}
                                                    className={"filter-name"}> {`${boardMember.member.fullName} (${boardMember.member.username})`}</div>
                                                <Icon id={boardMember.member._id} className={"filter-item-icon"}
                                                    name={this.props.board.membersFilter.includes(boardMember.member._id) ? "check" : ""} />
                                            </Label>
                                        </List.Item>
                                    )}
                                </List>
                                <Divider />
                                <List className={"filter-list"}>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_THIS_DAY"}
                                            onClick={this.clickDueDate}>
                                            <div id={"DUE_THIS_DAY"} className={"filter-name"}>Due this day</div>
                                            <Icon id={"DUE_THIS_DAY"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_THIS_DAY" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_NEXT_DAY"}
                                            onClick={this.clickDueDate}>
                                            <div id={"DUE_NEXT_DAY"} className={"filter-name"}>Due next day</div>
                                            <Icon id={"DUE_NEXT_DAY"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_NEXT_DAY" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_NEXT_WEEK"}
                                            onClick={this.clickDueDate}>
                                            <div id={"DUE_NEXT_WEEK"} className={"filter-name"}>Due next week</div>
                                            <Icon id={"DUE_NEXT_WEEK"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_NEXT_WEEK" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_NEXT_MONTH"}
                                            onClick={this.clickDueDate}>
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
                                        <Label className={"filter-item"} id={"DUE_DATE_MARKED_COMPLETED"}
                                            onClick={this.clickDueDate}>
                                            <div id={"DUE_DATE_MARKED_COMPLETED"} className={"filter-name"}>Due date
                                                marked as completed
                                            </div>
                                            <Icon id={"DUE_DATE_MARKED_COMPLETED"} className={"filter-item-icon"}
                                                name={this.props.board.dueDateMode === "DUE_DATE_MARKED_COMPLETED" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item>
                                        <Label className={"filter-item"} id={"DUE_DATE_NOT_MARKED_COMPLETED"}
                                            onClick={this.clickDueDate}>
                                            <div id={"DUE_DATE_NOT_MARKED_COMPLETED"} className={"filter-name"}>Due date
                                                not marked as completed
                                            </div>
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
                                            <div id={"UNION"} className={"filter-name"}>Matches any label and any
                                                member
                                            </div>
                                            <Icon id={"UNION"} className={"filter-item-icon"}
                                                name={this.props.board.filterMode === "UNION" ? "check" : ""} />
                                        </Label>
                                    </List.Item>
                                    <List.Item className={"filter-list"}>
                                        <Label className={"filter-item"} id={"INTERSECTION"}
                                            onClick={this.switchFilterMode}>
                                            <div id={"INTERSECTION"} className={"filter-name"}>Matches any label and any
                                                member
                                            </div>
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
                            Archived
                        </Button>
                        <CardsArchivedModal
                            open={this.state.openArchived}
                            archivedLists={this.props.archivedLists}
                            archivedCards={this.props.archivedCards}
                            onRestore={(listId) => this.props.restoreList(listId)}
                            onDelete={(listId) => this.props.deleteList(listId)}
                            onClose={() => this.setState({ openArchived: false })}
                        />
                    </div>
                    <Button className="button-header" onClick={async () => {
                        try {
                            let download = (filename, text) => {
                                let element = document.createElement('a');
                                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
                                element.setAttribute('download', filename);
                                element.style.display = 'none';
                                document.body.appendChild(element);
                                element.click();
                                document.body.removeChild(element);
                            }
                            download(`${this.props.board.name}.json`, JSON.stringify(await axios.get(`${UrlConfig.API}/boards/${this.props.board._id}/export`, tokenHeader())));
                        } catch (e) {
                            throw e
                        }

                    }}>
                        Export
                    </Button>
                </div>
            </div>
        )
    }
}

export default BoardHeader