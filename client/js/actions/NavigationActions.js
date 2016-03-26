var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var NavigationConstants = require('../constants/NavigationConstants.js');

var PlanActions = {
	changeCurrentPage: function(page) {
		AppDispatcher.dispatch({
			actionType: NavigationConstants.NAVIGATION_CHANGE,
			page: page
		});
	}
};

module.exports = PlanActions;