const mongoose = require('mongoose');

const Board = new mongoose.Schema({
    name: {type: String},
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    closed: {type: Boolean, default: false},
    categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}]
}, {timestamps: true});

module.exports = mongoose.model('Board', Board);