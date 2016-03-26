var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TaskConstants = require('../constants/TaskConstants.js');

var TaskActions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: TaskConstants.TASK_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: TaskConstants.TASK_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: TaskConstants.TASK_DESTROY,
			doc: doc
		});
	},
};

module.exports = TaskActions;
