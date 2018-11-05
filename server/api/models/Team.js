const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    name: String,
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{
        member: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        role: {type: String, enum: ['Admin', 'Member'], default: "Member"},
        _id: false
    }],
    boards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}]
}, {timestamps: true});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;