const OAuthClients = require('./models').OAuthClients;
const OAuthTokens = require('./models').OAuthTokens;
const OAuthUsers = require('./models').OAuthUsers;
const OAuthRefreshTokens = require('./models').OAuthRefreshTokens;
const OAuthAuthorizationCodes = require('./models').OAuthAuthorizationCodes;

const bcrypt = require('bcrypt')
const InvalidGrantError = require('oauth2-server/lib/errors/invalid-grant-error');

const getUser = async function(username, password) {
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

module.exports.generateAccessToken = OAuthTokens.generateAccessToken

module.exports.getAccessToken = OAuthTokens.getAccessToken
module.exports.getRefreshToken = OAuthRefreshTokens.getRefreshToken
module.exports.getAuthorizationCode = OAuthAuthorizationCodes.getAuthorizationCode
module.exports.getClient = OAuthClients.getClient
module.exports.getUser = getUser

module.exports.saveToken = OAuthTokens.saveToken
module.exports.saveAuthorizationCode = OAuthAuthorizationCodes.saveAuthorizationCode

module.exports.revokeToken = OAuthTokens.revokeToken
module.exports.revokeAuthorizationCode = OAuthAuthorizationCodes.revokeAuthorizationCode

module.exports.validateScope = OAuthTokens.validateScope
module.exports.verifyScope = OAuthTokens.verifyScope