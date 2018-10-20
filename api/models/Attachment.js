const mongoose = require('mongoose');

const Attachment = new mongoose.Schema({
    name: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
}, {timestamp: true});

module.exports = mongoose.model('Attachment', Attachment);