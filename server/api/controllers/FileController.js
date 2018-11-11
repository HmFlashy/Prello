const Attchment = require("../models/index").Attachment;
const throwError = require("../helper/RequestHelper").throwError;
const mongoose = require("mongoose");

const addAttachment = async (name, owner, cardId, url) => {
    try {
        attachment = new Attchment({
            name,
            owner,
            card: cardId,
            url
        })
        attachment = await comment.save()
        return [await Attchment.findById(attachment._id).populate(
            [{
                path: "owner",
                select: ["_id", "fullName", "initials", "username"]
            }]
        ), await Card.findOneAndUpdate({ _id: cardId },
            { $push: { attachments: attachment._id } }, { "new": true })]
    } catch (error) {
        throw error
    }
};


module.exports = {
    addAttachment
};