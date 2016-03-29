var bcrypt = require('bcrypt-nodejs');

var User = require('../../models/user');
var UserSetupRequest = require('../../models/userSetupRequest');

function sendFailedJson(res) {
  res.json({
		success: false,
		message: 'Registration failed. Invalid token or id. If you have submitted multiple registration requests,'
			+ 'you will need to use the most recent link or submit a new registration request.'
	});
}

module.exports = function (app) {
	app.post('/sign-up', function(req, res) {
		var email = req.headers['email'];
		var firstName = req.headers['firstname'];
		var lastName = req.headers['lastname'];
		var password = req.headers['password'];

		if (!email || !firstName || !lastName || !password) {
			return res.json({
				success: false,
				message: "One or more required fields not supplied.",
			});
		}

		User.findOne({
			"email": email
		}, function(err, user) {
			if (err) {
				throw err;
			}
			if (user) {
				return res.json({
					success: false,
					message: "There is already a user with that email address.",
				});
			} else if (!user) {
				user = new User();
				user.email = email;
				user.firstName = firstName;
				user.lastName = lastName;
				user.password = user.generateHash(password);

				UserSetupRequest.findOne({
					"email": user.email
				}, function (err, userSetupRequest) {
					// if there is no user but there has already been a registration request,
					// create a new token (because we don't store them plan-text) and
					// send it to the user's email address
					if (!userSetupRequest) {
						userSetupRequest = new UserSetupRequest();
					}

					userSetupRequest.email = user.email;
					userSetupRequest.firstName = user.firstName;
					userSetupRequest.lastName = user.lastName;
					userSetupRequest.password = user.password;
					userSetupRequest.attempts = 0;
					userSetupRequest.isExpired = false;
					userSetupRequest.generateTokenAndSendEmail(function () {
						return res.json({
							success: true,
							message: 'User registration request successfully submitted. Check your email for instructions on how to complete your registration.',
						});
					});
				});
			}
		});
	});

	app.post('/sign-up/:id', function(req, res) {
		var token = req.headers['token'];
		var id = req.params.id;

		if (!token) {
			return sendFailedJson(res);
		}

		UserSetupRequest.findOne({
			"_id": id
		}, function (err, userSetupRequest) {
			if (err) {
				console.log(err);
				return sendFailedJson(res);
			}

			if (userSetupRequest.isValidToken(token)) {
				var user = new User();
				user.email = userSetupRequest.email;
				user.firstName = userSetupRequest.firstName;
				user.lastName = userSetupRequest.lastName;
				user.password = userSetupRequest.password;

				userSetupRequest.isExpired = true;
				userSetupRequest.password = null;
				userSetupRequest.save(function (err) {
					if (err) { console.log(err); }
				});

				user.save(function (err) {
					if (err) { console.log(err); }
					return res.json({
						success: true,
						message: 'User successfully registered. You may now login to the application.',
					});
				});
			} else {
				return sendFailedJson(res);
			}
		});
	});
}
