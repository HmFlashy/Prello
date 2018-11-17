var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const VALID_SCOPES = require('../scopes')

const OAuthToken = new Schema({
  accessToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  client: String,
  scope: String,
  user: { type: Schema.Types.ObjectId, ref: 'OAuthUser' }
});

const OAuthTokens = mongoose.model('OAuthTokens', OAuthToken);

OAuthTokens.getAccessToken = async (bearerToken) => {
  return await OAuthTokens.findOne({ accessToken: bearerToken });
};

OAuthTokens.generateAccessToken = (client, user, scope) => {
  const payload = {
    userId: user._id,
    scope: scope
  }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" })
}

OAuthTokens.saveToken = async (token, client, user) => {
  const accessToken = new OAuthTokens({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    scope: token.scope,
    client: client.id,
    user: user
  });
  const OAuthRefreshTokensModel = mongoose.model('OAuthRefreshTokens')
  const refreshToken = new OAuthRefreshTokensModel({
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    scope: token.scope,
    client: client.id,
    user: user,
  })
  // Can't just chain `lean()` to `save()` as we did with `findOne()` elsewhere. Instead we use `Promise` to resolve the data.
  await accessToken.save()
  await refreshToken.save()
  let saveResult = new Object({
    ...token,
    client: client,
    user: user
  })
  return saveResult;
};

OAuthTokens.validateScope = async (user, client, scope) => {
  return scope
    .split(' ')
    .filter(s => VALID_SCOPES.indexOf(s) >= 0)
    .join(' ');
}

OAuthTokens.verifyScope = async (token, scope) => {
  if (!token.scope) {
    return false;
  }
  let requestedScopes = scope.split(' ');
  let authorizedScopes = token.scope.split(' ');
  return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0);
}

module.exports = OAuthTokens
