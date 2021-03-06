import React, { Component } from 'react';
import './CardOverview.css'
import { Card, Icon, Label } from 'semantic-ui-react'
import DynamicInput from '../../Input/DynamicInput'
import Avatar from '../../Avatar';
import { GetDueDateColor, SmallDate } from '../../../../helpers/DateHelper'
import { Draggable } from 'react-beautiful-dnd';
import autoBind from 'react-autobind';

class CardOverview extends Component {

    constructor() {
        super()
        this.updateCard = this.updateCard.bind(this)
        this.displayCardModal = this.displayCardModal.bind(this)
        this.validateNewName = this.validateNewName.bind(this)
        this.ChangeEyeState = this.ChangeEyeState.bind(this)
        this.state = {
            isNameUpdating: false,
            isHoverEye: false
        }
        autoBind(this);
    }

    componentDidMount() {
    }

    validateNewName(event) {
        if (event.target.value.trim() !== "") {
            this.updateCard({ name: this.props.card.name, _id: this.props.card._id }, { name: event.target.value, _id: this.props.card._id })
        }
        else console.log("Please fill the card name field")
    }

    updateCard(oldValue, data) {
        this.setState({
            isNameUpdating: false
        })
        this.props.updateCard(this.props.card._id, oldValue, data)
    }

    displayCardModal() {
        this.props.history.push(`/card/${this.props.card._id}`)
        this.props.displayCardModal(this.props.card._id)
    }

    ChangeEyeState(eyeState) {
        this.setState({
            isHoverEye: eyeState
        })
    }

    render() {
        return (
            <Draggable draggableId={this.props.card._id} index={this.props.card.pos}>
                {(provided, snapshot) => (
                    <div
                        className='cardOverview'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <Card onClick={this.displayCardModal}>
                            <Card.Content>
                                {
                                    this.props.card.labels.length > 0 ?
                                        <Card.Content className="labels">
                                            {
                                                this.props.card.labels.map(label => <Label key={label._id}
                                                    className="big_label"
                                                    color={label.color}
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        this.props.changeFullLabelDisplay()
                                                    }}
                                                >{this.props.fullLabelDisplay ? label.name : " "}
                                                </Label>)
                                            }
                                        </Card.Content>
                                        :
                                        null
                                }
                                <Card.Header>
                                    <DynamicInput
                                        type='text'
                                        textToDisplay={this.props.card.name}
                                        placeholder={this.props.card.name}
                                        onValidate={this.validateNewName}
                                    />
                                </Card.Header>
                                <Card.Content className="information">
                                    {
                                        this.props.card.dueDate ?
                                            <Label color={GetDueDateColor(this.props.card.dueDate, this.props.card.dueDateCompleted)}><Icon name='calendar alternate outline' />{SmallDate(this.props.card.dueDate)}</Label>
                                            :
                                            null
                                    }
                                    {
                                        this.props.card.cardInformation.nbComments > 0 ?
                                            <Label><Icon name='comment outline' />{this.props.card.cardInformation.nbComments}</Label>
                                            :
                                            null
                                    }
                                    {
                                        this.props.card.cardInformation.nbAttachments > 0 ?
                                            <Label><Icon name='attach' />{this.props.card.cardInformation.nbAttachments}</Label>
                                            :
                                            null
                                    }
                                    {

                                        this.props.card.cardInformation.nbItems > 0 ?
                                            <Label><Icon name='check square' color={this.props.card.cardInformation.nbItemsChecked === this.props.card.cardInformation.nbItems ? "green" : null} />{this.props.card.cardInformation.nbItemsChecked}/{this.props.card.cardInformation.nbItems}</Label>
                                            :
                                            null
                                    }
                                </Card.Content>
                                <Card.Content textAlign='right' className="members">
                                    {
                                        this.props.card.members.map(member => {
                                            return <Avatar key={member._id} _id={member._id}
                                                fullName={member.fullName}
                                                bio={member.bio}
                                                className="member-avatar" name={member.fullName} round size="25" textSizeRatio={1.4}></Avatar>
                                        })
                                    }
                                </Card.Content>

                            </Card.Content>
                            <span className="eye" onClick={this.props.changeWatchState} onMouseEnter={() => this.ChangeEyeState(true)} onMouseOut={() => this.ChangeEyeState(false)}>
                                <Icon disabled={!this.state.isHoverEye} name='eye' />
                            </span>
                        </Card>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default CardOverview
