function RequestSecurity(config) {

	this.isAuthorized = function () {
		if (!config.method || !config.user || !config.securityRoles) {
			return false;
		}

		switch (config.method) {
			case "POST":
				return config.securityRoles.create(config.user);
				break;
			case "GET":
				return config.securityRoles.read(config.user);
				break;
			case "PUT":
				return config.securityRoles.update(config.user);
				break;
			case "DELETE":
				return config.securityRoles.destroy(config.user);
				break;
			default:
				return false;
				break;
		}
	}

}

module.exports = RequestSecurity;