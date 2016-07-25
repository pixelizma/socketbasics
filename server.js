var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
moment.locale('tr');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket) {
	console.log('User connected via socket.io!');
	
	socket.on('joinRoom', function(obj){
		clientInfo[socket.id] = obj;
		socket.join(obj.room);
		socket.broadcast.to(obj.room).emit('message', {
			name: 'System',
			text: obj.name+' has joined!',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function(message) {
		console.log(message.text);

		//işlemi gönderen bağlantı dışındaki bağlantılara gönderir...
		//socket.broadcast.emit('message', message);

		//işlemi gönderen bağlantı dahil tüm bağlantılara gönderir...
		//io.emit('message', message);

		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat app!',
		timestamp: moment().valueOf()
	});
});



http.listen(PORT, function() {
	console.log('Server started!');
});