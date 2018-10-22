require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

module.exports = {
    Card: require('./Card'),
    Board: require('./Board'),
    List: require('./List'),
    Attachment: require('./Attachment'),
    Action: require('./Action'),
    User: require('./User'),
    Label: require('./Label'),
    Team: require('./Team')
};