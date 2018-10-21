const mongoose = require('mongoose');

const List = new mongoose.Schema({
    name: {type: String},
    isArchived: {type: Boolean, default: false},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'}
}, {timestamps: true});

module.exports = mongoose.model('List', List);
