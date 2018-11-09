const express = require('express')

const oauth = require('../server/OAuth2Server')
const path = require('path')

module.exports = (app) => {

    app.set('view engine', 'pug')
    app.set('views', path.join(__dirname, '../views'));
    app.use('/static', express.static(path.join(__dirname, '..', 'views', 'public')));

    const router = express.Router()
    router.post('/token', require('../ldap/middlewares/verifyLdap'), oauth.token())
    router.post('/authorize', require('./authorize'), require('./login').LoginError)
    router.get('/authorize', require('./login').Login)
    return router;
}