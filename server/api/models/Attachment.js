const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    name: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
    date: { type: Date, default: Date.now },
    url: String
});

const Attachment = mongoose.model('Attachment', AttachmentSchema);

module.exports = Attachment;