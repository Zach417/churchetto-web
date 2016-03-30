var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ChurchConstants.js');

var Store = new StoreTemplate(ChurchettoDataService.churches);

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
