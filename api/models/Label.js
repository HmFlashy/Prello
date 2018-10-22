const mongoose = require('mongoose')

const Label = new mongoose.Schema({
    name: String,
    color: String
}, { timestamps: true });

module.exports = mongoose.model('Label', Label);