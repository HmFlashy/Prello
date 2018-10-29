import React, {Component} from "react";
import {Card, Button, Modal, Header, Dropdown, Input} from "semantic-ui-react"
import NewBoard from "../NewBoard/NewBoard";

class NewBoardModal extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.addBoard = this.addBoard.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
        this.state = {
            currentNameBoard: "",
            currentCategory: null,
            currentVisibility: null,
            currentTeam: null
        }
    }

    componentWillMount() {
        this.state = {
            modalOpen: false,
            currentNameBoard: "",
            currentCategory: this.props.categoryOptions.length > 0 ?
                this.props.categoryOptions.find(
                category => this.props.categoryId? this.props.categoryId === category.key: "No Category" === category.key).value: "",
            currentVisibility: this.props.visibilityOptions.length > 0 ? this.props.visibilityOptions[0].value: "",
            currentTeam: this.props.teamOptions.length > 0 ? this.props.teamOptions[0].value: ""
        }
    }

    handleChange(e, {id, value}) {
        this.setState({[`current${id}`]: value});
    }

    changeVisibility() {
        this.setState({modalOpen: !this.state.modalOpen})
    }

    addBoard() {
        if (this.state.currentNameBoard) {
            this.props.addBoard(this.state.currentNameBoard, this.state.currentCategory, this.state.currentVisibility, this.state.currentTeam);
            this.changeVisibility();
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

export default NewBoardModal