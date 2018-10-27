const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isChecked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date() }
})

const CheckListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    items: [ItemSchema],
    createdAt: { type: Date, default: Date() }
});

const CardSchema = new mongoose.Schema({
    name: { type: String },
    desc: String,
    dueDate: Date,
    dueDateCompleted: Date,
    isArchived: { type: Boolean, default: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    labels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Label" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
    checklists: [CheckListSchema],
    watchers: [{
        watcher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        lastView: { type: Date, default: Date.now() },
        nbUnviewedActions: { type: Number, default: 0 },
        _id: false
    }],
    list: { type: mongoose.Schema.Types.ObjectId, ref: "List" },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    pos: Number,
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Action" }],
    cardInformation: {
        nbComments: { type: Number, default: 0 },
        nbItems: { type: Number, default: 0 },
        nbItemsChecked: { type: Number, default: 0 },
        nbAttachments: { type: Number, default: 0 },
        description: { type: String, default: false }
    }
}, { timestamps: true });

const Checklist = mongoose.model("CheckList", CheckListSchema);
const Card = mongoose.model("Card", CardSchema);
const Item = mongoose.model("Item", ItemSchema);

module.exports = {
    Checklist: Checklist,
    Card: Card,
    Item
};