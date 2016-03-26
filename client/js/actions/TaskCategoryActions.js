var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/TaskCategoryConstants.js');

var Actions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.TASKCATEGORY_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.TASKCATEGORY_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.TASKCATEGORY_DESTROY,
			doc: doc
		});
	},
};

module.exports = Actions;