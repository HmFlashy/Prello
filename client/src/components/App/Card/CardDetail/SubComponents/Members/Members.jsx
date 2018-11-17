import React from 'react';
import Avatar from '../../../../Avatar';

export default (props) => (
    <div className={props.className}>
        <p>Members</p>
        <div className="">
            {
                props.card ?
                    props.card.members.map(member =>
                        console.log(member) || <Avatar _id={member._id}
                            fullName={member.fullName}
                            bio={member.bio}
                            name={member.fullName} round size="25" textSizeRatio={1.4}></Avatar>)
                    : ""
            }
        </div>
    </div>
)