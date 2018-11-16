require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports = {
    Card: require('./Card').Card,
    Item: require('./Card').Item,
    Checklist: require('./Card').Checklist,
    Board: require('./Board').Board,
    List: require('./List'),
    Attachment: require('./Attachment'),
    Action: require('./Action'),
    User: require('./User').User,
    Category: require('./User').Category,
    Label: require('./Label'),
    Team: require('./Team'),
    Comment: require('./Comment'),
    Poll: require('./Board').Poll,
    Option: require('./Board').Option
};