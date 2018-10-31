var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const OauthClient = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array },
  grants: { type: Array }
});

const OAuthClients = mongoose.model('OAuthClients', OauthClient);

OAuthClients.getClient = async (clientId, clientSecret) => {
  const query = { 
    clientId: clientId
  }
  clientSecret ? query.clientSecret = clientSecret : null
  const client = await OAuthClients.findOne(query);
  return client
};

module.exports = OAuthClients
