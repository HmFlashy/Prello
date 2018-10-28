const mongoose = require("mongoose");
const db = require("../models");
const throwError = require("../helper/RequestHelper").throwError;

const BoardSchema = new mongoose.Schema({
    name: {type: String},
    lists: [{type: mongoose.Schema.Types.ObjectId, ref: "List"}],
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}],
    members: [{
            member: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            role: String,
            _id: false
        }],
    starred: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    isClosed: {type: Boolean, default: false},
    activities: [{type: mongoose.Schema.Types.ObjectId, ref: "Action"}],
    visibility: {type: String}
}, {timestamps: true});

const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;