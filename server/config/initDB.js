const mongoose = require("mongoose");
const Card = require("../api/models/index").Card;
const List = require("../api/models/index").List;
const Board = require("../api/models/index").Board;
const Label = require("../api/models/index").Label;
const User = require("../api/models/index").User;
const Comment = require("../api/models/index").Comment;
const Attachment = require("../api/models/index").Attachment;
const Category = require("../api/models/index").Category;
const Team = require("../api/models/index").Team;
const Checklist = require("../api/models/index").Checklist;
const Poll = require("../api/models/index").Poll;
const Option = require("../api/models/index").Option;
const passwordHelper = require("../api/helper/passwordHelper");
const OAuthClient = require("../oauth/server/models/OAuthClients")
const logger = require('../logger')

require("dotenv").config({});
connect();

function connect() {
    return mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    })
}

async function initDB() {
    let array = [];
    for (const collection in mongoose.connection.collections) {
        array.push(mongoose.connection.collections[collection].deleteMany());
    }
    await Promise.all(array);

    const alexHash = await passwordHelper.passwordHelper("a");
    const Alex = User({
        name: "Alex", fullName: "Alex Aufauvre", bio: `Amazing skills in design, I'm the guy you need to 
    enhance your application`, initials: "AA", username: "Giroud", organization: "Polytech"
        , email: "a@a.a", hash: alexHash
    });
    const hugoHash = await passwordHelper.passwordHelper("m");
    const Hugo = User({
        name: "Hugo", fullName: "Hugo Maitre", bio: `Student ; Programer ; Gamer ; What else? Not active on github as 
        I would like to be but hey no worry, one day you'll know my name ;) jk x)
`, initials: "HM", username: "HmFlashy", organization: "Polytech", email: "hugo.maitre69@gmail.com", hash: hugoHash
    });

    const PrelloClient = new OAuthClient({
        name: 'Khal-Prello-API',
        id: process.env.OAUTH_CLIENTID_PRELLO,
        secret: process.env.OAUTH_SECRET_PRELLO,
        redirectUris: [process.env.PRELLO_CLIENTURL],
        grants: ['password', 'authorization_code'],

    })

    const kevinHash = await passwordHelper.passwordHelper("g");
    const Kevin = User({
        name: "Kevin", fullName: "Kevin Giordani", bio: `IOT Expert, I will put my grain of salt 
    in your application`, initials: "KG", username: "kevin.kevin01", organization: "Polytech"
        , email: "k@k.k", hash: kevinHash
    });
    const lorisHash = await passwordHelper.passwordHelper("z");
    const Loris = User({
        name: "Loris", fullName: "Loris Zirah", bio: `DB Expert and Data Scientist, let's give a meaning to 
    your data`, initials: "LZ", username: "Airkan", organization: "Polytech", email: "l@l.l"
        , hash: lorisHash
    });

    const Khal = Team({
        name: "KHAL", creator: Loris._id, members: [
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

    Alex.teams = [{ team: Khal._id, role: "Admin" }];
    Hugo.teams = [{ team: Khal._id, role: "Member" }];
    Kevin.teams = [{ team: Khal._id, role: "Member" }];

    const FrontEnd = Label({ name: "Front-End", color: "yellow" });
    const BackEnd = Label({ name: "Back-End", color: "blue" });
    const DB = Label({ name: "Database", color: "green" });
    const DB2 = Label({ name: "Database", color: "green" });

    const card1 = Card({
        name: "Add comment to a card",
        labels: [BackEnd._id, DB._id],
        pos: 100000
    });
    const card2 = Card({
        name: "Add members to a card",
        labels: [BackEnd._id, FrontEnd._id],
        pos: 200000
    });
    const card3 = Card({
        name: "Add attachments to a card",
        labels: [FrontEnd._id],
        pos: 100000
    });
    const card4 = Card({
        name: "Teach Hugo how to use css",
        labels: [FrontEnd._id],
        pos: 100000
    });
    const card5 = Card({
        name: "Use machine learning algorithms",
        pos: 100000,
        labels: [DB2._id]
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

    const checkList1 = Checklist({
        title: "Checklist", items: [
            { name: "BD" },
            { name: "Front" },
            { name: "Back" },
            { name: "Design" }
        ]
    });
    card2.checklists = [checkList1];
    card2.cardInformation.nbItems = 4;

    const checkList2 = Checklist({
        title: "Checklist No Idea", items: [
            { name: "Idea 1" },
            { name: "Idea 2", isChecked: true },
            { name: "Idea 3", isChecked: true },
            { name: "Idea 4" }]
    });
    card3.checklists = [checkList2];
    card3.cardInformation.nbItems = 4;
    card3.cardInformation.nbItemsChecked = 2;

    const list1 = List({ name: "Done", cards: [card1._id, card2._id], pos: 100000 });
    list1.watchers = [{ watcher: Kevin._id }, { watcher: Loris._id }];
    const list2 = List({ name: "Doing", cards: [card3._id], pos: 200000 });
    list2.watchers = [{ watcher: Kevin._id }, { watcher: Loris._id }, { watcher: Hugo._id }
        , { watcher: Alex._id }];
    const list3 = List({ name: "To Do", cards: [card4._id], pos: 300000 });
    const list4 = List({ name: "Doing", cards: [card5._id], pos: 100000 });
    list3.watchers = [{ watcher: Loris._id }];

    const option1 = Option({
        title: "C'est nul",
        voters: [Hugo._id]
    })

    const option2 = Option({
        title: "Génial",
        voters: []
    })

    const poll = Poll({
        title: "Super poll !",
        owner: Kevin._id,
        card: card1._id,
        options: [
            option1,
            option2
        ]
    })

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
            },
            {
                member: Alex._id,
                role: "Member"
            }],
        visibility: "Team",
        starred: [Kevin._id, Loris._id],
        labels: [DB._id, FrontEnd._id, BackEnd._id],
        boardInformation: {
            nbStars: 2,
            nbMembers: 4
        },
        polls: [poll._id]
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
        starred: [Loris._id, Hugo._id],
        labels: [DB2._id],
        boardInformation: {
            nbStars: 2,
            nbMembers: 2
        },
    });

    const board3 = Board({
        name: "Alexa",
        owner: Hugo._id,
        visibility: "Private",
        members: [{
            member: Hugo._id,
            role: "Admin"
        }],
        boardInformation: {
            nbStars: 0,
            nbMembers: 1
        }
    });

    const board4 = Board({
        name: "Industrial Project",
        owner: Hugo._id,
        visibility: "Private",
        members: [{
            member: Hugo._id,
            role: "Admin"
        }],
        boardInformation: {
            nbStars: 0,
            nbMembers: 1
        }
    });

    const board5 = Board({
        name: "Teads",
        owner: Hugo._id,
        visibility: "Private",
        members: [{
            member: Hugo._id,
            role: "Admin"
        }],
        starred: [Hugo._id],
        boardInformation: {
            nbStars: 1,
            nbMembers: 1
        }
    });

    DB.board = board1._id;
    FrontEnd.board = board1._id;
    BackEnd.board = board1._id;
    DB2.board = board2._id;

    const hugoCategory1 = Category({ name: "School" });
    const hugoCategory2 = Category({ name: "Hobbies" });
    const hugoCategory3 = Category({ name: "AI" });
    Hugo.categories = [hugoCategory1, hugoCategory2, hugoCategory3];

    Hugo.boards = [
        {
            board: board1._id,
            role: "Admin",
            category: hugoCategory1
        },
        {
            board: board2._id,
            role: "Admin",
            category: hugoCategory2
        },
        {
            board: board3._id,
            role: "Admin",
            category: hugoCategory3
        },
        {
            board: board4._id,
            role: "Admin"
        },
        {
            board: board5._id,
            role: "Admin",
            category: hugoCategory1
        }
    ];

    const kevinCategory1 = Category({ name: "IOT" });
    const kevinCategory2 = Category({ name: "LOL" });
    Kevin.boards = [{
        board: board1._id,
        role: "Admin",
        category: kevinCategory1
    }];
    Kevin.categories = [kevinCategory1, kevinCategory2];

    Kevin.starred = [board1._id];
    Loris.starred = [board1._id, board2._id];
    Hugo.starred = [board2._id, board5._id];
    Alex.boards = [{
        board: board1._id,
        role: "Member"
    }];

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
    card1.watchers = [{ watcher: Alex._id }];
    Alex.cardsWatched = [card1._id];

    card2.list = list1._id;
    card2.board = board1._id;

    card3.list = list2._id;
    card3.board = board1._id;
    card3.watchers = [{ watcher: Kevin._id }, { watcher: Hugo._id }];
    Kevin.cardsWatched = [card3._id];

    card4.list = list3._id;
    card4.board = board1._id;

    card5.list = list4._id;
    card5.board = board2._id;
    card5.watchers = [{ watcher: Loris._id }, { watcher: Hugo._id }];
    Loris.cardsWatched = [card5._id];
    Hugo.cardsWatched = [card3._id, card5._id];

    list1.board = board1._id;
    list1.watchers = [{ watcher: Kevin._id }];
    list2.board = board1._id;
    list3.board = board1._id;
    list3.watchers = [{ watcher: Loris._id }, { watcher: Kevin._id }];
    list4.board = board2._id;
    list4.watchers = [{ watcher: Loris._id }];

    Kevin.listsWatched = [list1._id];
    Loris.listsWatched = [list3._id, list4._id];

    array = [];
    array.push(poll.save());
    array.push(Card.insertMany([card1, card2, card3, card4, card5]));
    array.push(List.insertMany([list1, list2, list3, list4]));
    array.push(Board.insertMany([board1, board2, board3, board4, board5]));
    array.push(await PrelloClient.save())
    array.push(User.insertMany([Alex, Kevin, Hugo, Loris]));
    array.push(Category.insertMany([hugoCategory2, hugoCategory1, hugoCategory3, kevinCategory1, kevinCategory2]));
    array.push(Team.insertMany([Khal]));
    array.push(Label.insertMany([FrontEnd, BackEnd, DB, DB2]));

    Promise.all(array).then(() => {
        logger.info("Init DB successful");
        logger.info("Closing the connection to the database");
        mongoose.connection.close();
    }).catch(error => logger.error(error.message))
}

mongoose.connection.once("open", async function () {
    logger.info("Connected to MongoDB");
    await initDB()
}).catch(err => logger.error(error.message));
