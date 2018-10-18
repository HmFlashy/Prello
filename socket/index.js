const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');

module.exports.listen = (server) => {
	
	var io = socketio.listen(server);
    io.adapter(redisAdapter(process.env.REDIS_URL));
    
	io.sockets.on('connection', (socket) => {
		console.log("Connected")
		//On place nos events ici
		socket.emit("mdr")
		socket.on('subscribeToBoard', () => {
			console.log("mdr")
		});

		socket.on("error", (error) => {
			console.log(error)
		})

	});
};