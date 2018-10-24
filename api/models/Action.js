const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now()},
    type: String
});

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;