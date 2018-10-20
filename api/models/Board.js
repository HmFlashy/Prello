const mongoose = require('mongoose');

const Board = new mongoose.Schema({
    name: {type: String, required: false},
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    closed: {type: Boolean, default: false},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
}, {timestamp: true});

mongoose.model('Board', Board);