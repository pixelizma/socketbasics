var socket = io();

socket.on('connect', function() {
	console.log('connect');
});

var $messageArea = $('.messages');
socket.on('message', function(message){
	var momentTimeStamp = moment.utc(message.timestamp);
	console.log(message.text);
	$messageArea.append('<p><strong>' + momentTimeStamp.local().format('h:m a') 
										+ ' : </strong>'+message.text+'</p>');
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