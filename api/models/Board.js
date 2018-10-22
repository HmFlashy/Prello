const mongoose = require('mongoose');

const Board = new mongoose.Schema({
    name: {type: String},
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
    members: [{
        member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        role: String
    }],
    closed: {type: Boolean, default: false},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Action'}]
}, {timestamps: true});

module.exports = mongoose.model('Board', Board);