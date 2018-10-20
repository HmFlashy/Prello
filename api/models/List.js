const mongoose = require('mongoose');

const List = new mongoose.Schema({
    name: {type: String, require: true},
    closed: {type: Boolean, default: false},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}]
}, {timestamp: true});

mongoose.model('List', List);
