import React from 'react';
import { Label } from 'semantic-ui-react'

export default (props) => (
    <div className={props.className}>
        <p>Labels</p>
        <div className="displayRow">
            {props.card.labels
                ?
                props.card.labels.map(label => <p key={label._id}><Label color={label.color} horizontal>
                    {label.name}
                </Label></p>)
                : ""}
        </div>
    </div>
)