const mongoose = require('mongoose')

const Label = new mongoose.Schema({
    name: String,
}, {timestamps: true});

module.exports = mongoose.model('Label', Label);