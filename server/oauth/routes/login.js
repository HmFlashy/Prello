
const InvalidRequestError = require('oauth2-server').InvalidRequestError;

module.exports = {
  Login(req, res) {
    if(!req.query.response_type){
      throw new InvalidRequestError("response_type is missing")
    }
    if(!req.query.client_id){
      throw new InvalidRequestError("client_id is missing")
    }
    if(!req.query.scope){
      throw new InvalidRequestError("the scope is missing")
    }
    if(!req.query.redirect_uri){
      throw new InvalidRequestError("redirect_uri is missing")
    }

    return res.render('login', { // views: login
      redirect_uri: req.query.redirect_uri,
      client_id: req.query.client_id,
      scope: req.query.scope,
      response_type: req.query.response_type,
      state: 'truc'
    })
  },
  LoginError(err, req, res, next){
    if(!req.query.response_type){
      throw new InvalidRequestError("response_type is missing")
    }
    if(!req.query.client_id){
      throw new InvalidRequestError("client_id is missing")
    }
    if(!req.query.scope){
      throw new InvalidRequestError("the scope is missing")
    }
    if(!req.query.redirect_uri){
      throw new InvalidRequestError("redirect_uri is missing")
    }
    let errMessage = null
    if(err.message == "WRONG_USERNAME_OR_EMAIL"){
      errMessage = "Wrong username or email"
    } else if(err.message == "WRONG_PASSWORD") {
      errMessage = "Wrong password"
    }
    res.render('login', { // views: login
      redirect_uri: req.query.redirect_uri,
      client_id: req.query.client_id,
      scope: req.query.scope,
      response_type: req.query.response_type,
      state: 'truc',
      email: req.body.username,
      error: errMessage
    })
    return res.end()
  }
}