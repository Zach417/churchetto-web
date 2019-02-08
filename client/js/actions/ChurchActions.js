var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ChurchConstants.js');

var Actions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.CHURCH_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.CHURCH_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.CHURCH_DESTROY,
			doc: doc
		});
	},
};

module.exports = Actions;
