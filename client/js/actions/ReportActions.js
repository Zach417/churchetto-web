var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ReportConstants.js');

var Actions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.REPORT_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.REPORT_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.REPORT_DESTROY,
			doc: doc
		});
	},
};

module.exports = Actions;
