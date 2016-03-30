var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/UserConstants.js');

var UserStore = new StoreTemplate(ChurchettoDataService.users);

UserStore.getUserFromEmail = function (email, callback) {
	UserStore.get(function (docs) {
		for (var i = 0; i < docs.length; i++) {
			if (docs[i].email === email) {
				return callback(docs[i]);
			}
		}

		return callback({});
	});
}

UserStore.getCurrentUser = function (callback) {
	UserStore.get(function (docs) {
		return callback(docs[0]);
	});
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.USER_UPDATE:
			UserStore.update(action.doc, function(data) {
				UserStore.emitChange();
			});
			break;
	}
});

module.exports = UserStore;
