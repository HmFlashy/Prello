const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    bio: String,
    email: String,
    fullName: String,
    initials: String,
    username: String,
    organization: String,
    teams: [{
        team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
        role: String,
        _id: false
    }],
    boards: [{
        board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
        category: CategorySchema,
        role: String,
        _id: false
    }],
    categories: [CategorySchema]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = {
    User: User,
    Category: Category
};