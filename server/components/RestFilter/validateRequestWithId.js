var filter = require('../JsonFilter');
var moment = require('moment');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res, next) {
		var email = req.session.email;
		var accessToken = req.cookies.accessToken;
		var id = req.params.id;

		if (!email || !accessToken || !id) {
			return res.status(401).json(config.invalidRequest);
		}

		req.body = filter(config.writeFilterSchema, req.body);

		getUser(email, accessToken, function (user) {

			var requestSecurity = new RequestSecurity({
				method : req.method,
				user: user,
				securityRoles: config.securityRoles
			});

			if (!requestSecurity.isAuthorized()) {
				return res.status(401).json(config.invalidRequest);
			}

			config.findOne(user, id, function (doc) {
				if (doc && doc._id) {
					req.body.modifiedBy = user._id;
					req.body.modifiedOn = moment();
					return next();
				}

				return res.status(401).json(config.invalidRequest);
			});
		});
	}

}
