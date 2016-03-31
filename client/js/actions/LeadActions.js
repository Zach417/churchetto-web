var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/LeadConstants.js');

var Actions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.LEAD_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.LEAD_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.LEAD_DESTROY,
			doc: doc
		});
	},
};

module.exports = Actions;
