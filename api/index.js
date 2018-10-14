const express = require('express');
const path = require('path');

const router = express.Router();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(require('./routes'));

router.all('*', (req, res) => {
  res.sendStatus(404);
  res.end();
});

module.exports = router;

// Connect to Mongoose
connect()

function connect(){
  return mongoose.connect('mongodb://mongo/prello')
}

mongoose.connection.once('open', function() {
  console.log('Connected to mongoDB')
}).on('error', function(error){
  console.log('Connection error:', error)
})

module.exports = router