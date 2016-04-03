var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ChurchConstants.js');

var Store = new StoreTemplate(ChurchettoDataService.churches);

Store.getSubDocFromChurch = function (church, subDoc, id) {
	if (!church[subDoc] || church[subDoc].length === 0) {
		return {};
	}

	for (var i = 0; i < church[subDoc].length; i++) {
		if (church[subDoc][i]._id == id) {
			return church[subDoc][i];
		}
	}

	return {};
}

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.CHURCH_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CHURCH_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.CHURCH_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
