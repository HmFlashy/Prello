const mongoose = require('mongoose')

const LabelSchema = new mongoose.Schema({
    name: String,
    color: String,
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'}
}, { timestamps: true });

const Label = mongoose.model('Label', LabelSchema);

module.exports = Label;