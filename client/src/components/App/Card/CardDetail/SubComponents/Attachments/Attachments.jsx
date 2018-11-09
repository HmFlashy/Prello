import React from 'react';
import './Attachments.css'
import { Image, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'

const imageThumbnail = {
    pdf: "https://png.pngtree.com/svg/20170509/i_pdf_356308.png"
}

export default (props) => (
    <div className={props.className + " displayRow"}>
        <Icon name='paperclip' />
        <div>
            <p>Attachments</p>
            {console.log(props.attachments) || props.attachments.map(attachment =>
                <div className="attachment">
                    <div className='image'>
                        <Image src={imageThumbnail[attachment.name.split('.')[attachment.name.split('.').length - 1]]} size='mini' />
                    </div>
                    <div>
                        <p>{attachment.name}</p>
                        <div className="displayRow">
                            <p>{moment(attachment.date).fromNow()}</p>
                            <Button icon onClick={() => props.onDeleteAttachment(attachment._id)}><Icon name="cancel" color="red"></Icon></Button>
                        </div>
                    </div>

                </div>
            )
            }
        </div>
    </div>
)