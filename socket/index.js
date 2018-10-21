const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis')(process.env.URL_REDIS);
redisAdapter.pubClient.on('error', (error) => console.log(error));
redisAdapter.pubClient.on('connect', () => console.log("Connected to Redis"));
let io = null

const socketLog = (text) => {
	console.log("| SocketIO | : " + text)
}

module.exports = {
	listen: (server) => {

		try {
			io = socketio(server);
			io.adapter(redisAdapter)
			io.on('connection', (socket) => {
				socketLog("A client is connected ( ip: " + socket.handshake.address + " )")
				//On place nos events ici
	
				socket.on('subscribeToBoard', () => {
					console.log("subscribe to the board")
				});
	
				socket.on("error", (error) => {
					console.log(error)
				})
	
			});
		} catch (error) {
			console.log("MDR")
		}
	},
	broadcast: (event, data) => {
		io.of('/').emit(event, data)
	}
}