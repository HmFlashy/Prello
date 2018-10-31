const mongoose = require('mongoose')
const OAuthServer = require('express-oauth-server');
const OAuthUser = mongoose.model('User');
const jwt = require('jsonwebtoken')
require('./models')

const oauth = new OAuthServer({
    model: require('./model'),
    grants: ['password', 'authorization_code'],
    useErrorHandler: true
  });

oauth.populateCurrentUser = () => {
  return (req, res, next) => {
    const token = res.locals.oauth.token.accessToken
    const tokenDecoded = jwt.decode(token)
    OAuthUser.findById(tokenDecoded.userId)
    .then(user => {
      req.user = user
      next()
    })
    .catch(error => console.log(error) || Promise.reject(error))
  }
}

module.exports = oauth;