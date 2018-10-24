const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isArchived: {type: Boolean, default: false},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Action'}],
    watchers: [{
        watcher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        lastView: {type: Date, default: Date.now()},
        nbUnviewedActions: {type: Number, default: 0},
        _id: false
    }],
    listInformation: {
        nbCards: {type: Number, default: 0}
    }
    }, {timestamps: true});

const List = mongoose.model('List', ListSchema);

module.exports = List
