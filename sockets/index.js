const socketio = require('socket.io');
const redisAdapter = require('socket.io-redis');


module.exports.listen = function(server) {
	var io = socketio.listen(server);
    io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
    
     io.sockets.on('connection', function (socket) {
     	console.log("Connected")
        //On place nos events ici
     	socket.on('action', function() {
        
		});

		/*
        ** Notez qu'il est possible d'inverser le processus 
		** pour permettre à d'autres fichiers d'utiliser le même socket
		** par exemple :
		*/
             
		/*
    	** J'exporte le socket ainsi que les sockets 
    	** pour permettre d'envoyer à tous les clients par exemple
    	*/
        
     });
};