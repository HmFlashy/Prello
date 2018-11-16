const express = require('express');
const oauth = require('../../../oauth/server/OAuth2Server')
const router = express.Router();

router.post('/*', oauth.authenticate({ scope: "write" }))
router.put('/*', oauth.authenticate({ scope: "write" }))
router.delete('/*', oauth.authenticate({ scope: "write" }))
router.get('/*', oauth.authenticate({ scope: "read" }))


router.use('/cards', require('./cards'));
router.use('/lists', require('./lists'));
router.use('/boards', require('./boards'))
router.use('/files', require('./files.js'))
router.use('/profile', require('./profile'))
router.use('/me', require('./me'))
router.use('/teams', require('./teams'))

module.exports = router;
