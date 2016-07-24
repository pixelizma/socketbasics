var socket = io();

socket.on('connect', function() {
	console.log('connect');
});

socket.on('message', function(message){
	console.log(message.text);
});