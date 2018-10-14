const mongoose = require('mongoose');

const Action = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    type: String
});

mongoose.model('Action', Action);