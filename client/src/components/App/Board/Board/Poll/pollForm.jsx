import React, { Component } from "react";
import "./poll.css"
import { Modal, Button, Input, Dropdown, } from "semantic-ui-react"

class PollForm extends Component {

    constructor(props) {
        super(props);
        console.log(props.card)
        this.state = {
            value: this.props.value || "",
            card: this.props.card || "",
        };
    }
    render() {
        return (
            <div>
                <Modal.Content>
                    <Input value={this.state.value} onChange={(event) => this.setState({ value: event.target.value })}></Input>
                    <Dropdown placeholder='Select card' text={this.state.card.name ? this.state.card.name : "No card"}>
                        <Dropdown.Menu>
                            <Dropdown.Item text={"No card"} onClick={() => this.setState({ card: "" })} />
                            {this.props.cards.map(card =>
                                <Dropdown.Item text={card.name} onClick={() => this.setState({ card: card })} />
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Content>
                <Modal.Actions>
                    <Button icon='cancel' content='Cancel' color='red' onClick={this.props.onCancel} />
                    <Button icon='check' content='Validate' color='green' onClick={() => this.state.value !== "" ? this.props.onSuccess({ name: this.state.value, card: this.state.card._id }) : this.props.onCancel()} />
                </Modal.Actions>
            </div>
        )
    }
}

export default PollForm