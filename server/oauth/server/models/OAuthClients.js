var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OauthClient = new Schema({
  name: String,
  id: { type: String },
  secret: { type: String },
  redirectUris: { type: Array },
  grants: { type: Array },
  user: { type: Schema.Types.ObjectId, ref: 'OAuthUser' }
});

const OAuthClients = mongoose.model('OAuthClients', OauthClient);

OAuthClients.getClient = async (clientId, clientSecret) => {
  const query = { 
    id: clientId
  }
  clientSecret ? query.secret = clientSecret : null
  const client = await OAuthClients.findOne(query);
  return client
};

module.exports = OAuthClients
