import React from 'react';
import './Attachments.css'
import { Image, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import axios from 'axios'
import UrlConfig from '../../../../../../config/UrlConfig'
import { tokenHeader } from '../../../../../..//helpers/HeaderHelper'
const FileDownload = require('js-file-download');

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
                        <Image src={imageThumbnail[attachment.name.split('.')[attachment.name.split('.').length - 1]]}
                            onClick={() => {
                                var parser = document.createElement('a');
                                parser.href = attachment.url;
                                console.log(parser.host)
                                if (parser.host === "prello-khal.s3.eu-west-3.amazonaws.com") {
                                    try {
                                        var xhr = new XMLHttpRequest();
                                        xhr.open('GET', `${UrlConfig.API}/files?key=${attachment.name}`, true);
                                        xhr.setRequestHeader('Authorization', tokenHeader().headers.Authorization);
                                        xhr.responseType = 'arraybuffer';
                                        xhr.onload = function (e) {
                                            if (this.status == 200) {
                                                var blob = new Blob([this.response], { type: "application/pdf" });
                                                var link = document.createElement('a');
                                                link.href = window.URL.createObjectURL(blob);
                                                link.download = attachment.name;
                                                link.click();
                                            }
                                        };
                                        xhr.send();/*
                                        axios.get(, tokenHeader())
                                            .then((response) => {
                                                FileDownload(response.data, "files.pdf");
                                            });*/
                                    } catch (e) {
                                        throw e
                                    }
                                }
                                else {
                                    window.open(attachment.url)
                                }
                            }} size='mini' />
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