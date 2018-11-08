import React, {Component} from "react";
import {Card, Button, Modal, Header, Dropdown, Input} from "semantic-ui-react"

class BoardOverviewModal extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.refreshValues = this.refreshValues.bind(this);
        this.state = {
            currentNameBoard: "",
            currentCategory: null,
            currentVisibility: null
        }
    }

    handleChange(e, {id, value}) {
        this.setState({[`current${id}`]: value});
    }

    updateBoard = async () => {
        if (this.state.currentNameBoard) {
            await this.props.updateBoard(this.state.currentNameBoard, this.state.currentCategory, this.state.currentVisibility);
            this.props.closeBoardUpdateModal()
        } else {
            console.log("name required")
        }
    }

    refreshValues() {
        console.log(this.props.board)
        this.setState({
            currentNameBoard: this.props.board.name,
            currentCategory: this.props.categoryOptions.find(
                category => this.props.board.category? this.props.board.category._id === category.key: "No Category" === category.key).value,
            currentVisibility: this.props.board.visibility
        })
    }

    render() {
        return (
            <Modal open={this.props.isOpen} onMount={this.refreshValues}
                       onClose={this.props.closeBoardUpdateModal} closeIcon>
                <Header icon='table' content={"Update the board"}/>
                <Input placeholder={"Name"} id={"NameBoard"} value={this.state.currentNameBoard}
                       onChange={this.handleChange}/>
                <Dropdown value={this.state.currentCategory} id={"Category"}
                          onChange={this.handleChange} search selection
                          options={this.props.categoryOptions}/>
                <Dropdown placeholder='Visibility' id={"Visibility"}
                          value={this.state.currentVisibility} search selection
                          onChange={this.handleChange}
                          options={this.props.visibilityOptions}/>
                <Button.Group><Button negative onClick={this.props.closeBoardUpdateModal}>Cancel</Button>
                    <Button positive onClick={this.updateBoard}>Validate</Button></Button.Group>
            </Modal>
        )
    }
}

export default BoardOverviewModal