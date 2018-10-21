const mongoose = require('mongoose');
const db = require('../models');
require('../models/index');
require('dotenv').config();
connect();

function connect() {
    return mongoose.connect(process.env.URL_MONGODB, {
        useNewUrlParser: true
    })
}

function reversedRef() {
    const card1 = db.Card({name: "Add comment to a card"});
    const card2 = db.Card({name: "Add members to a card"});
    const card3 = db.Card({name: "Add attachments to a card"});
    const card4 = db.Card({name: "Teach Hugo how to use css"});
    const card5 = db.Card({name: "Use machine learning algorithms"});

    const list1 = db.List({name: "Done", cards: [card1._id, card2._id]});
    const list2 = db.List({name: "Doing", cards: [card3._id]});
    const list3 = db.List({name: "To Do", cards: [card4._id]});
    const list4 = db.List({name: "Doing", cards: [card5._id]});

    const board1 = db.Board({name: "Prello", lists: [list1._id, list2._id, list3._id]});
    const board2 = db.Board({name: "ADcare", lists: [list4._id]});

    card1.list = list1._id;
    card1.board = board1._id;

    card2.list = list1._id;
    card2.board = board1._id;

    card3.list = list2._id;
    card3.board = board1._id;

    card4.list = list3._id;
    card4.board = board1._id;

    card5.list = list4._id;
    card5.board = board2._id;

    list1.board = board1._id;
    list2.board = board1._id;
    list3.board = board1._id;
    list4.board = board2._id;

    db.Card.deleteMany({})
        .then(() => {
            db.Card.insertMany([card1, card2, card3, card4, card5],
                function(error, docs) {
                    if (error) return console.log(error)
            })})

    db.List.deleteMany({})
        .then(() => {
            db.List.insertMany([list1, list2, list3, list4],
                function(error, docs) {
                    if (error) return console.log(error)
                })})

    db.Board.deleteMany({})
        .then(() => {
            db.Board.insertMany([board1, board2],
                function (error, docs) {
                    if (error) return console.log(error)
                    else process.exit(0)
                })
        })
}

mongoose.connection.once('open', function () {
    reversedRef()
}).catch(err => console.log(err))
