const mongoose = require('mongoose')
const OAuthServer = require('express-oauth-server');
const OAuthUser = mongoose.model('User');
const jwt = require('jsonwebtoken')

const oauth = new OAuthServer({
    model: require('./model'),
    grants: ['password']
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
console.log(oauth.populateCurrentUser())

module.exports = oauth;