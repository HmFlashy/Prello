const mongoose = require("mongoose");
const Card = require("../models").Card;
const List = require("../models").List;
const Board = require("../models").Board;
const Label = require("../models").Label;
const User = require("../models").User;
const Comment = require("../models").Comment;
const Attachment = require("../models").Attachment;
const Category = require("../models").Category;
const Team = require("../models").Team;
const Checklist = require("../models").Checklist;

require("dotenv").config();
connect();

function connect() {
    return mongoose.connect(process.env.URL_MONGODB, {
        useNewUrlParser: true
    })
}

function reversedRef() {
    const Alex = User({
        name: "Alex", fullName: "Alex Aufauvre", bio: `Amazing skills in design, I'm the guy you need to 
    enhance your application`, initials: "AA", username: "Giroud", organization: "Polytech"
        , email: "alex.giroud@gmail.com"
    });
    const Hugo = User({
        name: "Hugo", fullName: "Hugo Maitre", bio: `Student ; Programer ; Gamer ; What else? Not active on github as I would like to be but hey no worry, one day you'll know my name ;) jk x)
`, initials: "HM", username: "HmFlashy", organization: "Polytech", email: "hugo.maitro@gmail.com"
    });
    const Kevin = User({
        name: "Kevin", fullName: "Kevin Giordani", bio: `IOT Expert, I will put my grain of salt 
    in your application`, initials: "AA", username: "kevin.kevin01", organization: "Polytech"
        , email: "kevin.kevin01@gmail.com"
    });
    const Loris = User({
        name: "Loris", fullName: "Loris Zirah", bio: `DB Expert and Data Scientist, let's give a meaning to 
    your data`, initials: "LZ", username: "Airkan", organization: "Polytech", email: "zirahloris@gmail.com"
    });

    const Khal = Team({
        name: "KHAL", creator: Loris._id, members :[
            {
                member: Alex._id, role: "Admin"
            },
            {
                member: Hugo._id, role: "Admin"
            },
            {
                member: Kevin._id, role: "Member"
            }
        ], boards: []
    });

    Alex.teams = [Khal._id];
    Hugo.teams = [Khal._id];
    Kevin.teams = [Khal._id];

    const FrontEnd = Label({name: "Front-End"});
    const BackEnd = Label({name: "Back-End"});
    const DB = Label({name: "Database"});

    const card1 = Card({
        name: "Add comment to a card",
        labels: [BackEnd._id, DB._id]
    });
    const card2 = Card({
        name: "Add members to a card",
        labels: [BackEnd._id, FrontEnd._id]
    });
    const card3 = Card({
        name: "Add attachments to a card",
        labels: [FrontEnd._id]
    });
    const card4 = Card({
        name: "Teach Hugo how to use css",
        labels: [FrontEnd._id]
    });
    const card5 = Card({
        name: "Use machine learning algorithms",
        labels: [DB._id]
    });

    const attachment1 = Attachment({
        name: "Css_For_The_Noobs",
        owner: Loris._id,
        date: new Date()
    });

    const attachment2 = Attachment({
        name: "How_To_Be_Salty",
        owner: Kevin._id,
        date: new Date()
    });

    card1.attachments = [attachment1._id];
    card1.members = [Kevin._id, Loris._id];
    card1.cardInformation.nbAttachments = 1;

    card2.members = [Kevin._id, Loris._id, Alex._id, Hugo._id];

    card4.members = [Alex._id];
    card5.members = [Hugo._id, Loris._id];

    card3.attachments = [attachment2._id];
    card3.cardInformation.nbAttachments = 1;

    const checkList1 = Checklist({title: "Checklist", items: [
            {name: "BD"},
            {name: "Front"},
            {name: "Back"},
            {name: "Design"}
            ]});
    card2.checklists = [checkList1];
    card2.cardInformation.nbItems = 4;

    const checkList2 = Checklist({title: "Checklist No Idea", items: [
            {name: "Idea 1"},
            {name: "Idea 2", isChecked: true},
            {name: "Idea 3", isChecked: true},
            {name: "Idea 4"}]});
    card3.checklists = [checkList2];
    card3.cardInformation.nbItems = 4;
    card3.cardInformation.nbItemsChecked = 2;

    const list1 = List({name: "Done", cards: [card1._id, card2._id]});
    list1.listInformation.nbCards = 2;
    list1.watchers = [{watcher: Kevin._id}, {watcher: Loris._id}];
    const list2 = List({name: "Doing", cards: [card3._id]});
    list2.listInformation.nbCards = 1;
    list2.watchers = [{watcher: Kevin._id}, {watcher: Loris._id}, {watcher: Hugo._id}
    , {watcher: Alex._id}];
    const list3 = List({name: "To Do", cards: [card4._id]});
    list3.listInformation.nbCards = 1;
    const list4 = List({name: "Doing", cards: [card5._id]});
    list4.listInformation.nbCards = 1;
    list3.watchers = [{watcher: Loris._id}];

    const board1 = Board({
        name: "Prello", lists: [list1._id, list2._id, list3._id], teams: [Khal._id],
        owner: Hugo._id,
        members: [
            {
                member: Kevin._id,
                role: "Admin"
            },
            {
                member: Hugo._id,
                role: "Admin"
            },
            {
                member: Loris._id,
                role: "Admin"
            }],
        visibility: "Team",
        starred: [Kevin._id, Loris._id]
    });

    Khal.boards = [board1._id];

    const board2 = Board({
        name: "ADcare", lists: [list4._id],
        owner: Loris._id,
        visibility: "Private",
        members: [{
            member: Loris._id,
            role: "Admin"
        },
            {
                member: Hugo._id,
                role: "Member"
            }],
        starred: [Loris._id]
    });

    const hugoCategory1 = Category({name: "School"});
    const hugoCategory2 = Category({name: "Hobbies"});
    Hugo.categories = [hugoCategory1, hugoCategory2];

    Hugo.boards = [{
        board: board1._id,
        role: "Admin",
        category: hugoCategory1
        },
        {
            board: board2._id,
            role: "Admin",
            category: hugoCategory2
        }];

    const kevinCategory1 = Category({name: "IOT"});
    const kevinCategory2 = Category({name: "LOL"});
    Kevin.boards = [{
        board: board1._id,
        role: "Admin",
        category: kevinCategory1
    }];

    Kevin.categories = [kevinCategory1, kevinCategory2];

    Loris.boards = [{
        board: board1._id,
        role: "Admin"
    },
        {
            board: board2._id,
            role: "Admin"
        }];

    card1.list = list1._id;
    card1.board = board1._id;
    card1.watchers = [{watcher: Alex._id}];

    card2.list = list1._id;
    card2.board = board1._id;

    card3.list = list2._id;
    card3.board = board1._id;
    card3.watchers = [{watcher: Kevin._id}, {watcher: Hugo._id}];

    card4.list = list3._id;
    card4.board = board1._id;

    card5.list = list4._id;
    card5.board = board2._id;
    card5.watchers = [{watcher: Loris._id}, {watcher: Hugo._id}];

    list1.board = board1._id;
    list2.board = board1._id;
    list3.board = board1._id;
    list4.board = board2._id;

    Card.deleteMany({})
        .then(() => {
            Card.insertMany([card1, card2, card3, card4, card5],
                function (error, docs) {
                    if (error) return console.log(error)
                })
        });

    List.deleteMany({})
        .then(() => {
            List.insertMany([list1, list2, list3, list4],
                function (error, docs) {
                    if (error) return console.log(error)
                })
        })

    Board.deleteMany({})
        .then(() => {
            Board.insertMany([board1, board2],
                function (error, docs) {
                    if (error) return console.log(error)
                })
        })

    User.deleteMany({})
        .then(() => {
            User.insertMany([Alex, Hugo, Kevin, Loris],
                function (error, docs) {
                    if (error) return console.log(error)
                })
        })

    Category.deleteMany({})
        .then(() => {
            Category.insertMany([hugoCategory2, hugoCategory1, kevinCategory1, kevinCategory2],
                function (error, docs) {
                    if (error) return console.log(error)
                })
        })

    Team.deleteMany({})
        .then(() => {
            Team.insertMany([Khal],
                function (error, docs) {
                    if (error) return console.log(error)
                })
        })

    Label.deleteMany({})
        .then(() => {
            Label.insertMany([FrontEnd, BackEnd, DB],
                function (error, docs) {
                    if (error) return console.log(error)
                    else process.exit(0)
                })
        })
}

mongoose.connection.once("open", function () {
    reversedRef()
}).catch(err => console.log(err))
