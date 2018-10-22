const mongoose = require('mongoose');

const List = new mongoose.Schema({
    name: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isArchived: {type: Boolean, default: false},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Action'}]
    }, {timestamps: true});

module.exports = mongoose.model('List', List);
