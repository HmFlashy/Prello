const mongoose = require('mongoose')

const Category = new mongoose.Schema({
    name: String
});

const User = new mongoose.Schema({
    name: String,
    bio: String,
    email: String,
    fullName: String,
    initials: String,
    username: String,
    organization: String,
    teams: [{
        team: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Team'
        },
        role: String
    }],
    boards: [{
        board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
        category: Category,
        role: String
    }],
    categories: [Category]
}, {timestamps: true});

module.exports = mongoose.model('User', User);
module.exports = mongoose.model('Category', Category);