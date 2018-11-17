import React, { Component } from 'react';
import './Comment.css'
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'
import autoBind from 'react-autobind';
export default class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
        autoBind(this);
    }

    send(event) {
        event.target.blur()
        let comment = this.state.comment
        console.log(comment)
        if (comment !== "") {
            this.props.onAddComment(comment);
        }
    }

    render() {
        return (
            <div>
                <div className={this.props.className + " displayRow"}>
                    <Icon name='comment outline' />
                    <p>Add comment</p>
                </div>
                <Form className="form">
                    <Form.Field>
                        <TextArea rows={2} autoHeight placeholder='Write a comment...' value={this.state.comment} onKeyPress={(event) => {
                            if (event.charCode === 13) {
                                this.send(event)
                                this.setState({ comment: "" })
                            }
                        }} onChange={(event, data) => this.setState({ comment: data.value })} />
                    </Form.Field>
                    <Button type='submit' onClick={this.send}>Submit</Button>
                </Form>
            </div>)
    }
}