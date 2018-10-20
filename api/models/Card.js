const mongoose = require('mongoose');

const Item = new mongoose.Schema({
    name: {type: String, required: true},
    isChecked: {type: Boolean, default: false}
});

const CheckList = new mongoose.Schema({
    title: {type: String, required: true},
    items: {
        type: [Item],
        default: []
    }
}, {timestamp: true});

const Card = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    desc: String,
    dueDate: Date,
    dueCompleteDate: Date,
    closed: {type: Boolean, default: false},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    labels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Label'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    attachments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attachment'}],
    checklist: [CheckList]
}, {timestamps: true});

module.exports = mongoose.model('Item', Item);
module.exports = mongoose.model('CheckList', CheckList);
module.exports = mongoose.model('Card', Card);