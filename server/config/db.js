const mongoose = require('mongoose');
mongoose.Promise = Promise;
const logger = require('../logger')

// Connect to Mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
})

mongoose.connection.once('open', function() {
  logger.info('Connected to mongoDB') 
}).on('error', function(error){
  logger.info('Connection error:', error)
})

require('../api/models')