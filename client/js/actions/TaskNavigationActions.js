var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TaskNavigationConstants = require('../constants/TaskNavigationConstants.js');

var TaskActions = {
	change: function(page) {
		AppDispatcher.dispatch({
			actionType: TaskNavigationConstants.TASKNAVIGATION_CHANGE,
			page: page
		});
	}
};

module.exports = TaskActions;