var authentication = require('./authentication');
var registration = require('./registration');
var reformation = require('./reformation');
var execution = require('./execution');

module.exports.login = function (options, callback) {
	var authenticator = new authentication();
	authenticator.login(options, callback);
}

module.exports.requestUserRegistration = function (options, callback) {
	var registrar = new registration();
	registrar.requestRegistration(options, callback);
}

module.exports.registerUser = function (options, callback) {
	var registrar = new registration();
	registrar.register(options, callback);
}

module.exports.requestPasswordReset = function(options, callback) {
	var resetter = new reformation();
    resetter.requestPasswordReset(options, callback);
}

module.exports.resetPassword = function(options, callback) {
	var resetter = new reformation();
    resetter.resetPassword(options, callback);
}

module.exports.execute = function(options, callback) {
	var executor = new execution();
    executor.request(options, callback);
}
