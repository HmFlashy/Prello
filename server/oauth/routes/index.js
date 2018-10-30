const express = require('express')
const router = express.Router()

const oauth = require('../server/OAuth2Server')

router.all('/token', oauth.token())
router.all('/authorise', (req, res, next) => {

})


module.exports = router;