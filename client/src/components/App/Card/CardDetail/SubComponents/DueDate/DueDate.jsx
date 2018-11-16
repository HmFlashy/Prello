import React, { Component } from 'react';
import './DueDate.css'
import { Segment, Form, Label, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { GetDueDateColor } from '../../../../../../helpers/DateHelper'
import ValidationInput from '../../../../Input/ValidationInput'

export default class DueDate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDeleting: false
        };
    }

    render() {
        return <div className={this.props.className}>
            <p>Due date</p>
            <div className="displayRow">
                <Segment color={GetDueDateColor(this.props.date, this.props.isCompleted)}>
                    <Form.Checkbox defaultChecked={this.props.isCompleted} onChange={(event, data) => this.props.onChange(data.checked)} label={Math.abs(moment(this.props.date).diff(moment(), 'hours')) < 21 ? moment(this.props.date).fromNow() : moment(this.props.date).format("MMMM Do YYYY, H:mm")} />
                </Segment>
                <Label className="remove-label" onClick={() => this.setState({ isDeleting: true })}><Icon className="remove-label-icon" name="cancel"></Icon></Label>
                <ValidationInput
                    isVisible={this.state.isDeleting}
                    header={"Delete Due Date"}
                    content={"Are you sure you want the due date of this card ?"}
                    onResult={(isValidated) => isValidated ? this.setState({ isDeleting: false }, () => this.props.deleteDueDate()) : this.setState({ isDeleting: false })}
                /></div >
        </div >
    }
}