const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {type: String},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    isArchived: {type: Boolean, default: false},
    cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: 'Action'}],
    watchers: [{
        watcher: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        lastView: {type: Date, default: Date.now()},
        nbUnviewedActions: {type: Number, default: 0},
        _id: false
    }],
    listInformation: {
        nbCards: {type: Number, default: 0}
    }
    }, {timestamps: true});

ListSchema.pre('remove', function(next) {
    let array = [];
    const Card = require('./index').Card;
    const User = require('./index').User;
    const Board = require('./index').Board;
    array.push(User.updateMany({listsWatched: {$in: [this._id]}}, {$pull: {listsWatched: this._id}}).exec());
    array.push(Board.update({lists: {$in: [this._id]}}, {$pull: {lists: this._id}}).exec())
    Card.find({list: this._id}).then(cards => {
        cards.forEach(card => {
            array.push(card.remove())
        })
    });
    Promise.all(array).then(next())
});

const List = mongoose.model('List', ListSchema);

module.exports = List
