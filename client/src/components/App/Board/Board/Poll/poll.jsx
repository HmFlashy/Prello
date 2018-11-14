import React, { Component } from "react";
import "./poll.css"
import { Button, Form, Modal, Segment, Input, Label, List, Popup, Checkbox } from "semantic-ui-react"
import Avatar from "../../../Avatar"
import DynamicInput from "../../../Input/DynamicInput"
import CardOverviewContainer from '../../../../../containers/CardContainers/CardOverviewContainer'
import ReactAvatar from "react-avatar"
import PollForm from "./pollForm"

class Poll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isFormOpened: false,
            formName: "",
            formCard: "",
            updatingId: ""
        };
        this.vote = this.vote.bind(this)
        this.addOption = this.addOption.bind(this)
        this.updatePoll = this.updatePoll.bind(this)
        this.addPoll = this.addPoll.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
        this.deletePollOption = this.deletePollOption.bind(this)
        this.updatePollOption = this.updatePollOption.bind(this)
    }
    vote(data) {
        this.props.vote(data)
    }
    addOption(data) {
        this.props.addOption(data)
    }
    updatePoll(data) {
        this.props.updatePoll(data)
    }
    addPoll(data) {
        this.props.addPoll(data)
    }
    deletePoll(data) {
        this.props.deletePoll(data)
    }
    deletePollOption(data) {
        this.props.deletePollOption(data)
    }
    updatePollOption(data) {
        this.props.updatePollOption(data)
    }


    render() {
        console.log(this.props)
        return (
            <div>
                <Popup
                    trigger={<Button className="button-header">Polls</Button>}
                    on='click'
                    open={this.state.isOpened}
                    onClose={() => this.setState({ isOpened: false })}
                    onOpen={() => this.setState({ isOpened: true })}
                    position='bottom left'>
                    <Popup.Content>
                        <div className="center-div">
                            <Button icon='add' color="green" onClick={() => this.setState({ isFormOpened: true, isOpened: false, formCard: false, formName: "", updatingId: "" })}>Create new poll</Button>
                        </div>
                        {this.props.polls.map(poll =>
                            <Segment>
                                <div className="displayRow spacebetween" >
                                    <p>{poll.title}</p>
                                    {poll.owner === this.props.userId
                                        ? <div> <Button icon='pencil' color="orange" onClick={() => this.setState({ isFormOpened: true, isOpened: false, formCard: poll.card, formName: poll.title, updatingId: poll._id })} />
                                            <Button icon='trash' color="red" onClick={() => this.deletePoll({ _id: poll._id, boardId: this.props.boardId })} />
                                        </div>
                                        : ""}
                                </div>

                                <div onClick={() => this.setState({ isOpened: false })}>
                                    {poll.card
                                        ? <div>
                                            <p>Related card</p>
                                            <CardOverviewContainer key={poll.card._id} cardId={poll.card._id} fullLabelDisplay={false} changeFullLabelDisplay={() => true} />
                                        </div>
                                        : ""
                                    }
                                </div>
                                <Form.Group>
                                    {poll.options.map(option =>
                                        <Segment className="displayRow spacebetween">
                                            <div className="displayRow">
                                                <Form.Field
                                                    control={Checkbox}
                                                    checked={option.voters.some(voter => voter._id === this.props.userId)}
                                                    onChange={(event) => this.vote({ pollId: poll._id, option: option.title, isVoting: !option.voters.some(voter => voter._id === this.props.userId), boardId: this.props.boardId })}
                                                ></Form.Field>
                                                <DynamicInput
                                                    type='text'
                                                    textToDisplay={option.title}
                                                    placeholder={option.title}
                                                    onValidate={(event) => this.updatePollOption({ pollId: poll._id, optionId: option._id, name: event.target.value, boardId: this.props.boardId })}
                                                />
                                            </div>
                                            <div>
                                                {
                                                    [option.voters.slice(0, 4).map(voter =>
                                                        <Avatar
                                                            _id={voter._id}
                                                            fullName={voter.fullName}
                                                            round
                                                            size="25"
                                                            textSizeRatio={1.4} />
                                                    ),
                                                    option.voters.length - 4 > 0
                                                        ?
                                                        <Popup
                                                            key={option.voters.length - 4}
                                                            trigger={<span>
                                                                <ReactAvatar key={option.voters.length - 4}
                                                                    name={`${option.voters.length - 4}`}
                                                                    round
                                                                    size={25}
                                                                    textSizeRatio={3} /></span>}
                                                            on='hover'>
                                                            <Popup.Header>Other voters</Popup.Header>
                                                            <Popup.Content>
                                                                {option.voters.slice(4).map(voter =>
                                                                    <div className="displayRow">
                                                                        <p>{voter.fullName}</p>
                                                                        <Avatar
                                                                            _id={voter._id}
                                                                            fullName={voter.fullName}
                                                                            round
                                                                            size="25"
                                                                            textSizeRatio={1.4} />
                                                                    </div>
                                                                )}
                                                            </Popup.Content>
                                                        </Popup>
                                                        : "",
                                                    poll.owner === this.props.userId
                                                        ? <Button icon='trash' color="red" onClick={() => this.deletePollOption({ _id: poll._id, optionId: option._id, boardId: this.props.boardId })} />
                                                        : ""
                                                    ]
                                                }
                                            </div>
                                        </Segment>
                                    )}
                                    <Input placeholder='New option' onKeyPress={(event) => {
                                        if (event.charCode === 13 && event.target.value !== "") {
                                            this.addOption({ pollId: poll._id, option: event.target.value, boardId: this.props.boardId })
                                            event.target.value = ""
                                        }
                                    }} />
                                </Form.Group>
                            </Segment>
                        )}
                    </Popup.Content>
                </Popup>
                {
                    < Modal
                        open={this.state.isFormOpened}
                        onClose={() => this.setState({ isFormOpened: false, isOpened: true })}
                        size='tiny'
                    >
                        <PollForm
                            value={this.state.formName}
                            card={this.state.formCard}
                            isUpdating={this.state.updatingId}
                            onSuccess={(data) => {
                                this.setState({ isFormOpened: false, isOpened: true })
                                this.state.updatingId !== ""
                                    ? this.updatePoll({ ...data, _id: this.state.updatingId, boardId: this.props.boardId })
                                    : this.addPoll({ ...data, owner: this.props.userId, boardId: this.props.boardId })
                            }}
                            onCancel={() => this.setState({ isFormOpened: false, isOpened: true })}
                            cards={this.props.cards}
                        ></PollForm>
                    </Modal>
                }
            </div>
        )
    }
}

export default Poll