/**
 * Schema definitions.
 */
const OAuthClients = require('./models').OAuthClients;
const OauthTokens = require('./models').OAuthTokens;
const OAuthUsers = require('./models').OAuthUsers;

const bcrypt = require('bcrypt')

/**
 * Get access token.
 */

module.exports.getAccessToken = function(bearerToken) {
  // Adding `.lean()`, as we get a mongoose wrapper object back from `findOne(...)`, and oauth2-server complains.
  return OauthTokens.findOne({ accessToken: bearerToken }).lean();
};

/**
 * Get client.
 */

module.exports.getClient = async function(clientId, clientSecret) {
  const client = await OAuthClients.findOne({ client_id: clientId, client_secret: clientSecret }).lean();
  return client;
};

/**
 * Get refresh token.
 */

module.exports.getRefreshToken = function(refreshToken) {
  return OAuthTokens.findOne({ refreshToken: refreshToken }).lean();
};

/**
 * Get user.
 */

module.exports.getUser = async function(username, password) {
  const user = await OAuthUsers.findOne({ username: username }).lean();
  if(true) {
    return user
  } else {
    return null
  }
};

module.exports.saveAuthorizationCode = function(code, client, user) {
  return OAuthUsers.findOne({ username: username, password: password }).lean();
};

/**
 * Save token.
 */

module.exports.saveToken = function(token, client, user) {
  var accessToken = new OauthTokens({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    client : client,
    clientId: client.client_id,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    user : user,
    userId: user._id,
  });
  // Can't just chain `lean()` to `save()` as we did with `findOne()` elsewhere. Instead we use `Promise` to resolve the data.
  return new Promise( function(resolve,reject){
    accessToken.save(function(err,data){
      if( err ) reject( err );
      else resolve( data );
    }) ;
  }).then(function(saveResult){
    // `saveResult` is mongoose wrapper object, not doc itself. Calling `toJSON()` returns the doc.
    saveResult = saveResult && typeof saveResult == 'object' ? saveResult.toJSON() : saveResult;

    // Unsure what else points to `saveResult` in oauth2-server, making copy to be safe
    var data = new Object();
    for( var prop in saveResult ) data[prop] = saveResult[prop];
    // /oauth-server/lib/models/token-model.js complains if missing `client` and `user`. Creating missing properties.
    data.client = data.clientId;
    data.user = data.userId;

    return data;
  });
};