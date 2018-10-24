const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    name: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    date: {type: Date, default: Date.now()}
});

const Attachment = mongoose.model('Attachment', AttachmentSchema);

module.exports = Attachment;