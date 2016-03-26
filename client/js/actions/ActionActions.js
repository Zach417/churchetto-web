var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ActionConstants.js');

var PlanActions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.ACTION_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.ACTION_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.ACTION_DESTROY,
			doc: doc
		});
	},
};

module.exports = PlanActions;
