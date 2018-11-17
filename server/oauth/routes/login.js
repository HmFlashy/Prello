const getClient = require('../server/model').getClient
const InvalidRequestError = require('oauth2-server').InvalidRequestError;
const logger = require('../../../../logger')

module.exports = {
  async Login(req, res) {
    try {
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
      const client = await getClient(req.query.client_id)
      if(!client){
        return res.status(400).send("Can't get client from this client_id")
      }
      return res.render('login', { // views: login
        redirect_uri: req.query.redirect_uri,
        client_id: req.query.client_id,
        client_name: client.name,
        scopes: req.query.scope.split(" "),
        response_type: req.query.response_type,
        state: 'truc'
      })
    } catch(error){
      logger.error(error.message)
      return res.sendStatus(500)
    }
  },
  async LoginError(err, req, res, next){
    try {
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
      const client = await getClient(req.query.client_id)
      if(!client){
        return res.status(400).send("Can't get client from this client_id")
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
        client_name: client.name,
        scopes: req.query.scope.split(" "),
        response_type: req.query.response_type,
        state: 'truc',
        email: req.body.username,
        error: errMessage
      })
      return res.end()
    } catch(error) {
      return res.sendStatus(500)
    }
  }
}