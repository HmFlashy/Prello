const express = require('express');
const path = require('path');
require('dotenv').config();

const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require("./config/db")
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token')
const VerifyAuthentification = require('./middlewares/VerifyAuthentification')

router.use(bearerToken())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(require('./routes/authRoutes'))
router.use(VerifyAuthentification, require('./routes/privateRoutes'));

router.all('*', (req, res) => {
  res.sendStatus(404);
  res.end();
});

module.exports = router