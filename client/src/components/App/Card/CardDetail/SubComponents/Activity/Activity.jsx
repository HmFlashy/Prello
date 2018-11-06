import React from 'react';
import './Activity.css'
import { Icon, Button, Segment } from 'semantic-ui-react'
import Avatar from 'react-avatar';
import moment from 'moment'

export default (props) => (
    <div>
        <div className={props.className + " displayRow"}>
            <Icon name='tasks' />
            <p>Activity</p>
        </div>
        {props.comments.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()).map(comment =>
            <Segment>
                <div className="displayRow commentDiv">
                    <div className="displayRow">
                        <Avatar className="avatarActivity" key={comment.author._id} name={comment.author.fullName} round size="25" textSizeRatio={1.4}></Avatar>
                        <div>
                            <p>{comment.content}</p>
                            <p>{moment(comment.date).fromNow()}</p>
                        </div>
                    </div>
                    <Button onClick={() => props.onDeleteComment(comment._id)}>Delete</Button>
                </div>
            </Segment>
        )}
    </div>
)