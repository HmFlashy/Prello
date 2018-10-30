/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('OAuthClients', new Schema({
  client_id: { type: String },
  client_secret: { type: String },
  redirectUris: { type: Array },
  grants: { type: Array }
}));

module.exports = mongoose.model('OAuthClients');
