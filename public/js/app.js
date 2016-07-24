var socket = io();

socket.on('connect', function() {
	console.log('connect');
});

var $messageArea = $('.messages');
socket.on('message', function(message){
	console.log(message.text);
	$messageArea.append('<p>'+message.text+'</p>');
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