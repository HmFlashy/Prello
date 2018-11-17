import React, { Component } from "react";
import "./poll.css"
import { Modal, Button, Input, Dropdown, Label } from "semantic-ui-react"

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
                <div className="poll-form">
                    <Modal.Content>
                        <div>
                            <Input value={this.state.value} label="Poll name" onChange={(event) => this.setState({ value: event.target.value })}></Input>
                        </div>
                        <div>
                            <Label>Attached Card</Label>
                            <Dropdown placeholder='Select card' label="Card attached" text={this.state.card.name ? this.state.card.name : "No card"}>
                                <Dropdown.Menu>
                                    <Dropdown.Item text={"No card"} onClick={() => this.setState({ card: "" })} />
                                    {this.props.cards.map(card =>
                                        <Dropdown.Item text={card.name} onClick={() => this.setState({ card: card })} />
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Modal.Content>
                </div>
                <Modal.Actions>
                    <Button icon='cancel' content='Cancel' color='red' onClick={this.props.onCancel} />
                    <Button icon='check' content='Validate' color='green' onClick={() => this.state.value !== "" ? this.props.onSuccess({ name: this.state.value, card: this.state.card._id }) : this.props.onCancel()} />
                </Modal.Actions>
            </div>
        )
    }
}

export default PollForm