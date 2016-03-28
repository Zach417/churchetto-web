module.exports = {

	isNotAllowed: function (user) {
		return false;
	},

	isActiveUser: function (user) {
		if (user && user._id) {
			return true;
		} else {
			return false;
		}
	},

	isAdmin: function (user) {
		if (user.isAdmin === true) {
			return true;
		} else {
			return false;
		}
	},
	
}