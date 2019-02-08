var filter = require('../JsonFilter');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res) {
		var email = req.session.email;
		var accessToken = req.cookies.accessToken;
		var id = req.params.id;

		if (!email || !accessToken || !id) {
			return res.status(401).json(config.invalidRequest);
		}

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
					var result = filter(config.readFilterSchema, doc);
					return res.json(result);
				}

				return res.json({});
			});
		});
	}

}
