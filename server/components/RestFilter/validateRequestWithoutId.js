var filter = require('../JsonFilter');
var moment = require('moment');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res, next) {
		var email = req.headers['email'];
		var accessToken = req.headers['access-token'];

		if (!email || !accessToken) {
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
;
			req.body.createdBy = user._id;
			req.body.createdOn = moment();
			req.body.modifiedBy = user._id;
			req.body.modifiedOn = moment();

			return next();
		});
	}
}
