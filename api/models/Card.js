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
    name: {type: String},
    desc: String,
    dueDate: Date,
    dueDateComplete: Date,
    isArchived: {type: Boolean, default: false},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    list: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
    labels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Label'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    attachments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attachment'}],
    checklists: [CheckList],
    watchers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    idList: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
    idBoard: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    pos: Number
}, {timestamps: true});

module.exports = mongoose.model('Item', Item);
module.exports = mongoose.model('CheckList', CheckList);
module.exports = mongoose.model('Card', Card);