var moment = require('moment');
moment.locale('tr');
var now = moment();

console.log(now.format());

console.log(now.format('DD.MM.YYYY'));

console.log(now.format('h:m a'));

console.log(now.format('D MMMM YYYY, H:m'));

console.log(now.format('X'));

console.log(now.format('x'));

console.log(now.valueOf());

var timestamp = 1469388546172;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format('h:m a'));

