import React from 'react';
import './DueDate.css'
import { Segment, Form } from 'semantic-ui-react'
import moment from 'moment'
import { GetDueDateColor } from '../../../../../../helpers/DateHelper'

export default (props) => (
    <div className={props.className}>
        <p>Due date</p>
        <Segment className="displayRow" color={GetDueDateColor(props.date, props.isCompleted)}>
            <Form.Checkbox defaultChecked={props.isCompleted} onChange={(event, data) => props.onChange(data.checked)} label={Math.abs(moment(props.date).diff(moment(), 'hours')) < 21 ? moment(props.date).fromNow() : moment(props.date).format("MMMM Do YYYY, H:mm")} />
        </Segment>
    </div>
)