var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/TaskTypeConstants.js');

var TaskActions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.TASKTYPE_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.TASKTYPE_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.TASKTYPE_DESTROY,
			doc: doc
		});
	},
};

module.exports = TaskActions;