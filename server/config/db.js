const mongoose = require('mongoose');
// Connect to Mongoose
mongoose.connect(process.env.URL_MONGODB, {
  useNewUrlParser: true
})

mongoose.connection.once('open', function() {
  console.log('Connected to mongoDB')
}).on('error', function(error){
  console.log('Connection error:', error)
})

require('../api/models')