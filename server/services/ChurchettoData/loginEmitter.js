var EventEmitter = require('events');
var util = require('util');

function LoginEmitter () {
	EventEmitter.call(this);
}

util.inherits(LoginEmitter, EventEmitter);

var loginEmitter = new LoginEmitter();

module.exports = loginEmitter;