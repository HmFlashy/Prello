/**
 * Schema definitions.
 */
const OAuthClients = require('./models').OAuthClients;
const OauthTokens = require('./models').OAuthTokens;
const OAuthUsers = require('./models').OAuthUsers;

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const throwError = require('../../api/helper/RequestHelper').throwError;
const InvalidGrantError = require('oauth2-server/lib/errors/invalid-grant-error');

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

module.exports.generateAccessToken = function(client, user, scope) {
  const payload = {
    userId: user._id,
    scope: scope
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h"})
}

/**
 * Get user.
 */

module.exports.getUser = async function(username, password) {
  const user = await OAuthUsers.findOne({ $or: [{username: username}, {email: username}]}).lean();
  if(user == null){
    throw new InvalidGrantError("WRONG_USERNAME_OR_EMAIL")
  }
  if(await bcrypt.compare(password, user.hash)) {
    return user
  } else {
    throw new InvalidGrantError("WRONG_PASSWORD")
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
  
  return accessToken.save()
  .then(function(saveResult){
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