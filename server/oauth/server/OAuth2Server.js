const OAuthServer = require('express-oauth-server');
const OAuthClient = require('./models/OAuthClients')

OAuthClient.countDocuments({}).then(c => {
  if (c === 0) {
    let defaultClient = new OAuthClient({
      name: 'PrelloAPI',
      client_id: process.env.OAUTH_CLIENTID_PRELLO,
      client_secret: process.env.OAUTH_SECRET_PRELLO,
      redirectUris: [process.env.PRELLO_CLIENTURL],
      grants: ['password'],
      scope: 'boards:read boards:write users.profile:read users.profile:write teams:read teams:write'
    })
    defaultClient.save()
  }
})

const oauth = new OAuthServer({
    model: require('./model'),
    grants: ['password'],
    debug: true
  });

module.exports = oauth;