const express = require('express');
require('dotenv').config();

const router = express.Router();
const bearerToken = require('express-bearer-token')

router.use(bearerToken())
const oauth = require('../oauth/server/OAuth2Server')

router.use(require('./routes/authRoutes/index'))
router.use(oauth.authenticate(), oauth.populateCurrentUser(), require('./routes/privateRoutes/index'));

router.all('*', (req, res) => {
  res.sendStatus(404);
  res.end();
});

module.exports = router