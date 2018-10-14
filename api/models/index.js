require('dotenv').config()
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);

module.exports.Card = require('./Card');
module.exports.Board = require('./Board');
module.exports.List = require('./List');
module.exports.Attachment = require('./Attachment');
module.exports.Action = require('./Action');