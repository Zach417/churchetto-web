var User = require('../../models/user');

module.exports = function(email, token, callback) {
    User.getUserAndValidate(email, token, function (user) {
    	callback(user);
    });
}