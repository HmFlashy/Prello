import React from 'react';
import './Comment.css'
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='comment outline' />
        <Form className="form">
            <p>
                Add comment
                            </p>
            <Form.Field>
                <TextArea rows={2} placeholder='Write a comment...' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    </div>
)