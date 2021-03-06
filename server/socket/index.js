const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis')(process.env.REDIS_URL);
const logger = require('../logger')


redisAdapter.pubClient.on('error', (error) => logger.error(error));
redisAdapter.pubClient.on('connect', () => logger.info("Connected to Redis"));
let io = null

const socketLog = (text) => {
	logger.info("| SocketIO | : " + text)
}
module.exports = {
	listen: (server) => {

		try {
			io = socketio(server);
			io.adapter(redisAdapter);
			io.on('connection', (socket) => {
				socketLog("A client is connected ( id: " + socket.id + " )")
				//On place nos events ici
	
				socket.on('subscribeBoard', (boardId) => {
					io.of('/').adapter.remoteJoin(socket.id, boardId, (error) => {
						if(error){
							return socket.log("An error occured: " + error)
						}
						socketLog(`User ${socket.id} subscribed to board ${boardId}`)
					})
				});

				socket.on('unsubscribeBoard', (boardId) => {
					io.of('/').adapter.remoteJoin(socket.id, boardId, (error) => {
						if(error){
							return socket.log("An error occured: " + error)
						}
						socketLog(`User ${socket.id} succesfully unsubscribed to board ${boardId}`)
					})
				});
				socket.on("error", (error) => {
					socketLog(error)
				})
	
			});
		} catch (error) {
			sockerLog(error)
		}
	},
	broadcast: (event, boardId, data) => {
		io.to(boardId).emit(event, data)
	}
}