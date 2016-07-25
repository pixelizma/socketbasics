var name = getQueryVariable('name') || 'Guest';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function() {
	console.log('connect');
});


socket.on('message', function(message){
	var $messageArea = $('.messages');
	var momentTimeStamp = moment.utc(message.timestamp);
	console.log(message.text);
	$messageArea.append('<p><strong>' +
							message.name + ' ' +
							momentTimeStamp.local().format('h:m a') +
							' : </strong>'+message.text+'</p>');
});

var $form = $('#message-form');

$form.on('submit', function(event){
	event.preventDefault();
	var $message = $form.find('textarea[name=message]')
	socket.emit('message', {
		name: name,
		text: $message.val()
	});
	$message.val('');
});