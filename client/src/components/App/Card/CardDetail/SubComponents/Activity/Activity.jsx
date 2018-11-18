import React, { Component } from 'react';
import './Activity.css'
import { Icon, Button, Segment } from 'semantic-ui-react'
import DynamicInput from '../../../../Input/DynamicInput'
import ValidationInput from '../../../../Input/ValidationInput'
import Avatar from '../../../../Avatar';
import moment from 'moment'
import autoBind from 'react-autobind';
export default class Activity extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isDeleting: false
        };
        autoBind(this);
    }

    render() {
        return (<div>
            <div className={this.props.className + " displayRow"}>
                <Icon name='tasks' />
                <p>Comments</p>
            </div>
            {this.props.comments.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()).map(comment =>
                <Segment key={comment._id}>
                    <div className="displayRow commentDiv">
                        <div className="displayRow">
                            <Avatar
                                className="avatarActivity"
                                _id={comment.author._id}
                                fullName={comment.author.fullName}
                                bio={comment.author.bio}
                                round
                                size="25"
                                textSizeRatio={1.4}></Avatar>

                            {this.props.userId === comment.author._id
                                ? <div><DynamicInput
                                    type='text'
                                    textToDisplay={<p className="commentP">{comment.content}    </p>}
                                    placeholder={comment.content}
                                    onValidate={(content) => { if (content.target.value !== "" && content.target.value.trim() !== "") this.props.onUpdateComment(comment._id, comment, content.target.value) }}
                                />
                                    {comment.wasModified
                                        ? <p>Modified : {moment(comment.dateModified).fromNow()}</p>
                                        : <p>Posted : {moment(comment.date).fromNow()}</p>
                                    }
                                </div>
                                : <div>
                                    <p className="commentP">{comment.content}    </p>
                                    {comment.wasModified
                                        ? <p>Modified : {moment(comment.dateModified).fromNow()}</p>
                                        : <p>Posted : {moment(comment.date).fromNow()}</p>
                                    }
                                </div>
                            }


                        </div>
                        {this.props.userId === comment.author._id ?
                            <div>
                                <Button onClick={() => this.setState({ isDeleting: true })} color="red" inverted>Delete</Button>
                            </div>
                            : ""
                        }
                        <ValidationInput
                            isVisible={this.state.isDeleting}
                            header={"Delete Your Message"}
                            content={"Are you sure you want to delete your account"}
                            onResult={(isValidated) => isValidated ? this.setState({ isDeleting: false }, () => this.props.onDeleteComment(comment._id)) : this.setState({ isDeleting: false })}
                        />
                    </div>
                </Segment>
            )}
        </div>)
    }
}