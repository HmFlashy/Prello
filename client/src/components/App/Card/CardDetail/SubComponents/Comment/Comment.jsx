import React, { Component } from 'react';
import './Comment.css'
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'

export default class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
    }

    render() {
        return <div className={this.props.className + " displayRow"}>
            <Icon name='comment outline' />
            <Form className="form">
                <p>
                    Add comment
                            </p>
                <Form.Field>
                    <TextArea rows={2} placeholder='Write a comment...' onChange={(event, data) => this.setState({ comment: data.value })} />
                </Form.Field>
                <Button type='submit' onClick={() => this.props.onAddComment(this.state.comment)}>Submit</Button>
            </Form>
        </div>
    }
}