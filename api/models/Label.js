const mongoose = require('mongoose')

const LabelSchema = new mongoose.Schema({
    name: String,
    color: String
}, { timestamps: true });

const Label = mongoose.model('Label', LabelSchema);

module.exports = Label;