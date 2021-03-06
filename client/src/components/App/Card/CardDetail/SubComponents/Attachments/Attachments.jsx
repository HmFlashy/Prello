import React, { Component } from 'react';
import './Attachments.css'
import { Image, Button, Icon, Segment } from 'semantic-ui-react'
import moment from 'moment'
import UrlConfig from '../../../../../../config/UrlConfig'
import { tokenHeader } from '../../../../../..//helpers/HeaderHelper'
import ValidationInput from '../../../../Input/ValidationInput'
import autoBind from 'react-autobind';
export default class Attachments extends Component {

    imageThumbnail = {
        pdf: "https://png.pngtree.com/svg/20170509/i_pdf_356308.png"
    }

    constructor(props) {
        super(props)
        this.state = {
            isDeleting: false
        };
        autoBind(this);
    }


    render() {
        return (
            <div className={this.props.className + " displayRow"}>
                <Icon name='paperclip' />
                <div className="segment-attachments">
                    <p>Attachments</p>
                    {this.props.attachments.map(attachment =>
                        <div key={ attachment.name } className="attachment">
                            <Segment className="segment-att displayRow">
                                <div className='image'>
                                    <Image src={this.imageThumbnail[attachment.name.split('.')[attachment.name.split('.').length - 1]]}
                                        onClick={() => {
                                            var parser = document.createElement('a');
                                            parser.href = attachment.url;
                                            if ((/^prello-khal\.s3.*\.amazonaws\.com$/).test(parser.host)) {
                                                try {
                                                    var xhr = new XMLHttpRequest();
                                                    xhr.open('GET', `${UrlConfig.API}/files?key=${attachment.name}`, true);
                                                    xhr.setRequestHeader('Authorization', tokenHeader().headers.Authorization);
                                                    xhr.responseType = 'arraybuffer';
                                                    xhr.onload = (e) => {
                                                        if (xhr.status > 199 && xhr.status < 400) {
                                                            var blob = new Blob([this.response], { type: "application/pdf" });
                                                            var link = document.createElement('a');
                                                            link.href = window.URL.createObjectURL(blob);
                                                            link.download = attachment.name;
                                                            link.click();
                                                        }
                                                    };
                                                    xhr.send();
                                                } catch (e) {
                                                    console.log(e)
                                                    throw e
                                                }
                                            }
                                            else {
                                                window.open(attachment.url)
                                            }
                                        }} size='mini' />
                                </div>
                                <div className="fullsize">
                                    <div className="displayRow attachment-title" >
                                        <p className="attachment-name">{attachment.name}</p>
                                        <Button icon onClick={() => this.setState({ isDeleting: true })}><Icon name="trash" color="red"></Icon></Button>
                                    </div>
                                    <div >
                                        <p>{moment(attachment.date).fromNow()}</p>
                                    </div>
                                </div>
                                <ValidationInput
                                    isVisible={this.state.isDeleting}
                                    header={"Delete this attachment"}
                                    content={"Are you sure you want to delete this attachment ?"}
                                    onResult={(isValidated) => isValidated ? this.setState({ isDeleting: false }, () => this.props.onDeleteAttachment(attachment._id)) : this.setState({ isDeleting: false })}
                                />
                            </Segment>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    }
}
