const express = require('express')
const router = express.Router()

const oauth = require('../server/OAuth2Server')

router.post('/token', oauth.token())
router.post('/authorise', oauth.authorize())


module.exports = router;