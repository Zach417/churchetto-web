var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/CampusConstants.js');

var Actions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.CAMPUS_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.CAMPUS_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.CAMPUS_DESTROY,
			doc: doc
		});
	},
};

module.exports = Actions;
