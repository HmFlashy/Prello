const mongoose = require('mongoose');

const Action = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    type: String
});

module.exports = mongoose.model('Action', Action);