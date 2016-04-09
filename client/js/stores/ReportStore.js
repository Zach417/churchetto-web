var StoreTemplate = require('./Template');
var ChurchettoDataService = require('../services/ChurchettoData');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ReportConstants.js');

var Store = new StoreTemplate(ChurchettoDataService.leads);

AppDispatcher.register(function(action) {
	switch(action.actionType) {

		case Constants.REPORT_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.REPORT_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.REPORT_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
