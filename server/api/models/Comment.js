const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
    content: String,
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;