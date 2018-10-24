import React from 'react';
import './DueDate.css'
import { Icon, Segment, Form } from 'semantic-ui-react'
import moment from 'moment';

const getColor = (date, isCompleted) => {
    console.log("ayay")
    if (isCompleted) {
        return 'green'
    }
    const diff = moment(date).diff(moment(), 'hours')
    if (diff >= 48) {
        return 'grey'
    }
    if (diff < 48 && diff >= 24) {
        return 'olive'
    }
    else if (diff < 24 && diff >= 12) {
        return 'yellow'
    }
    else if (diff < 12 && diff >= 0) {
        return 'orange'
    }
    else if (diff < 0) {
        return 'red'
    }
}

export default (props) => (
    <div className={props.className}>
        <p>Due date</p>
        <Segment className="displayRow" inverted color={getColor(props.date, props.isCompleted)}>
            <Form.Checkbox defaultChecked={props.isCompleted} onChange={(event, data) => props.onChange(data.checked)} label={Math.abs(moment(props.date).diff(moment(), 'hours')) < 21 ? moment(props.date).fromNow() : moment(props.date).format("MMMM Do YYYY, H:mm")} />
        </Segment>
    </div>
)