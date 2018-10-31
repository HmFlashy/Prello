
const InvalidRequestError = require('oauth2-server').InvalidRequestError;

module.exports = (req, res) => {
  console.log(req)
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
} 
//app.post('/oauth/prello/login', (req, res, next) => {
//     const user = {email: req.body.email, password: req.body.password}
//     userController.login(user).then(token => {
//       const auth = `Bearer ${token}`
//       req.method = 'get'
//       req.headers['authorization'] = auth
//       req.url = `/authorize?client_id=${req.query.client_id}&redirect_uri=${req.query.redirect_uri}`
//       next()
//     }).catch(err => {
//       console.error(err)
//     })
//   })