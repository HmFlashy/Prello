const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const PollSchema = new mongoose.Schema({
    title: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    card: { type: mongoose.Schema.Types.ObjectId, ref: "Card" },
    options: [OptionSchema]
});

const BoardSchema = new mongoose.Schema({
    name: { type: String },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    members: [{
        member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: String,
        _id: false
    }],
    polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
    starred: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isClosed: { type: Boolean, default: false },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Action" }],
    visibility: { type: String, enum: ['Private', 'Team', 'Public'], default: 'Private' },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
    boardInformation: {
        nbMembers: { type: Number, default: 1 },
        nbStars: { type: Number, default: 0 }
    }
}, { timestamps: true });

BoardSchema.pre('remove', function (next) {
    const List = require('./index').List;
    const Label = require('./index').Label;
    const User = require('./index').User;
    const Team = require('./index').Team;
    let array = [];
    List.find({ board: this._id }).then(lists => {
        lists.forEach(list => {
            array.push(list.remove())
        })
    });
    Label.find({ board: this._id }).then(labels => {
        labels.forEach(label => {
            array.push(label.remove())
        })
    });
    array.push(User.updateMany({ starred: { $in: [this._id] } }, { $pull: { starred: this._id } }).exec());
    array.push(User.updateMany({ "boards.board": { $in: [this._id] } }, { $pull: { boards: { board: this._id } } }).exec());
    array.push(Team.updateMany({ boards: { $in: [this._id] } }, { $pull: { boards: this._id } }).exec());
    Promise.all(array).then(next())
});

const Option = mongoose.model("Option", OptionSchema);
const Poll = mongoose.model("Poll", PollSchema);
const Board = mongoose.model("Board", BoardSchema);

module.exports = { Option, Poll, Board };