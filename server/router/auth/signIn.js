var bcrypt = require('bcrypt-nodejs');

var User = require('../../models/user');

function sendAuthorizationFailedJson(res) {
  res.json({
		success: false,
		message: 'Authentication failed.'
	});
}

module.exports = function (app) {
	// authenticate and assign tokens at /authenticate
	app.post('/sign-in', function(req, res) {
		var email = req.headers['email'];
		var password = req.headers['password'];

		if (!email || !password) {
			return res.json({
				success: false,
				message: "An email address or password was not provided.",
			});
		}

		User.findOne({
			"email": email
		}, function(err, user) {

			if (err) {
				throw err;
			}

			if (!user) {
				return res.json({
					success: false,
					message: "The email or password provided did not match any records.",
				});
			}

			if (!user.validPassword(password)) {
				return res.json({
					success: false,
					message: "The email or password provided did not match any records.",
				});
				return sendAuthorizationFailedJson(res);
			} else {
				user.generateToken(function (token) {
					res.cookie('accessToken', token);
					return res.json({
						success: true,
						message: "You have been successfully authenticated.",
					});
				});
			}
		});
	});
}
