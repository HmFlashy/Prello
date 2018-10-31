
module.exports = (req, res) => {
  return res.render('login', { // views: login
    redirect_uri: req.redirect_uri,
    displayedForm: true,
    client_id: req.query.client_id,
    scope: req.query.scope,
    email: req.body.email || '',
    errors: ['Invalid credentials']
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