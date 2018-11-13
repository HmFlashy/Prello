import React, {Component} from "react";
import {Card, Button, Modal, Header, Dropdown, Input} from "semantic-ui-react"
import NewBoard from "../NewBoard/NewBoard";
import { withRouter } from 'react-router-dom'

class NewBoardModal extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addBoard = this.addBoard.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.changeVisibilityTeam = this.changeVisibilityTeam.bind(this);
        this.state = {
            currentNameBoard: "",
            currentCategory: null,
            currentVisibility: null,
            currentTeam: null        }
    }

    componentWillMount() {
        this.state = {
            modalOpen: false,
            currentNameBoard: "",
            currentCategory: this.props.categoryOptions.length > 0 ? this.props.categoryOptions[0].value: "",
            currentVisibility: this.props.visibilityOptions.length > 0 ? this.props.visibilityOptions[0].value: "",
            /*currentCategory: this.props.categoryOptions.length > 0 ?
                this.props.categoryOptions.find(
                category => this.props.categoryId? this.props.categoryId === category.key: "No Category" === category.key).value: "",
            currentVisibility: this.props.visibilityOptions.length > 0 ? this.props.visibilityOptions[0].value: "",*/
            //currentTeam: this.props.teamOptions.length > 0 ? this.props.teamOptions[0].value: ""
            currentTeam: this.props.teamOptions.length > 0 ? this.props.teamOptions.find(
                team => this.props.teamId? this.props.teamId === team.key: "No Team" === team.key).value: ""
        }
    }

    handleChange(e, {id, value}) {
        this.setState({[`current${id}`]: value});
    }

    changeVisibility() {
        this.setState({modalOpen: !this.state.modalOpen})
    }
    changeVisibilityTeam() {
        this.setState({modalOpenTeam: !this.state.modalOpenTeam})
    }

    async addBoard() {
        if (this.state.currentNameBoard) {
            const newBoard = await this.props.addBoard(this.state.currentNameBoard, this.state.currentCategory, this.state.currentVisibility, this.state.currentTeam);
            this.changeVisibility();
            this.props.history.push(`/boards/${newBoard._id}`)
        } else {
            console.log("name required")
        }
    }
    async addTeam() {
        if (this.state.currentNameTeam) {
            const newTeam = await this.props.addTeam(this.state.currentNameTeam);
            this.changeVisibilityTeam();
            this.props.history.push(`/teams/${newTeam._id}`)
        } else {
            console.log("name required")
        }
    }
    render() {
        return (
            <Modal open={this.state.modalOpen} onClose={this.changeVisibility} trigger={<NewBoard changeVisibility={this.changeVisibility} />} closeIcon>
                <Header icon='table' content={"Creating a new board"}/>
                <Input placeholder={"Name"} id={"NameBoard"} value={this.state.currentNameBoard}
                       onChange={this.handleChange}/>
                <Dropdown value={this.state.currentCategory} id={"Category"}
                          onChange={this.handleChange} defaultValue={this.state.currentCategory} search selection
                          options={this.props.categoryOptions}/>
                <Dropdown placeholder='Visibility' id={"Visibility"}
                          defaultValue={this.state.currentVisibility} search selection
                          onChange={this.handleChange}
                          options={this.props.visibilityOptions}/>
                <Dropdown placeholder='Team' id={"Team"}
                          onChange={this.handleChange}
                          defaultValue={this.state.currentTeam} search selection options={this.props.teamOptions}/>
                <Button.Group><Button positive onClick={this.addBoard}>Create the board</Button></Button.Group>
            </Modal>
        )
    }
}

export default withRouter(NewBoardModal);