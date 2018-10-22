import React from 'react';
import './Attachments.css'
import { Image, Button, Icon } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='paperclip' />
        <div>
            <p>Attachments</p>
            {props.attachments.map(attachment =>
                <div className="attachment">
                    <div className='image'>
                        <Image src={attachment.url} size='mini' />
                    </div>
                    <div>
                        <p>{attachment.name}</p>
                        <div className="displayRow">
                            <p>{attachment.dateadded}</p>
                            <Button>Comment</Button>
                            <Button>Delete</Button>
                        </div>
                    </div>

                </div>
            )
            }
            <Button>Add attachment</Button>
        </div>
    </div>
)