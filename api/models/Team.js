const mongoose = require('mongoose')

const Team = new mongoose.Schema({
    name: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        role: String
    }],
    boards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}]
}, {timestamps: true});

module.exports = mongoose.model('Team', Team);