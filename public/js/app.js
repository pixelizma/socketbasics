var socket = io();

socket.on('connect', function() {
	console.log('connect');
});

socket.on('message', function(message){
	console.log(message.text);
});

var $form = $('#message-form');

$form.on('submit', function(event){
	event.preventDefault();
	var $message = $form.find('textarea[name=message]')
	socket.emit('message', {
		text: $message.val()
	});
	$message.val('');
});