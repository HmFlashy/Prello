const mongoose = require('mongoose');

// Connect to Mongoose
connect()

function connect(){
return mongoose.connect(process.env.URL_MONGODB)
}

mongoose.connection.once('open', function() {
  console.log('Connected to mongoDB')
}).on('error', function(error){
  console.log('Connection error:', error)
})