const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String
});

const UserSchema = new mongoose.Schema({
    bio: String,
    email: String,
    hash: String,
    fullName: String,
    initials: String,
    username: String,
    organization: String,
    teams: [{
        team: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
        role: String,
        _id: false
    }],
    cardsWatched: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
    listsWatched: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}],
    boards: [{
        board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
        category: CategorySchema,
        role: String,
        _id: false
    }],
    starred: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}],
    categories: [CategorySchema]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = {
    User: User,
    Category: Category
};