var filter = require('../JsonFilter');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res) {
		var email = req.headers['email'];
		var accessToken = req.headers['access-token'];

		if (!email || !accessToken) {
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

			config.findMany(user, function (docs) {
				var result = [];
				for (i=0;i<docs.length;i++){
					result.push(filter(config.readFilterSchema, docs[i]));
				}
				return res.json(result);
			});
		});
	}

}
