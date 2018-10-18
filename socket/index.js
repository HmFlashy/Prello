const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');

module.exports.listen = (server) => {

	const io = socketio(server);
    io.adapter(redisAdapter(process.env.REDIS_URL));
    
	io.on('connection', (socket) => {
		console.log("Connected")
		//On place nos events ici

		socket.on('subscribeToBoard', () => {
			console.log("mdr")
		});

		socket.on("error", (error) => {
			console.log(error)
		})

		socket.emit('cardUpdated')

	});
};