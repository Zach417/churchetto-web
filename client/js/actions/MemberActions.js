var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/MemberConstants.js');

var Actions = {
	update: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.MEMBER_UPDATE,
			doc: doc
		});
	},
	create: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.MEMBER_CREATE,
			doc: doc
		});
	},
	destroy: function(doc) {
		AppDispatcher.dispatch({
			actionType: Constants.MEMBER_DESTROY,
			doc: doc
		});
	},
};

module.exports = Actions;
