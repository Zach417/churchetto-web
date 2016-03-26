var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/ActionConstants.js');

var Store = new StoreTemplate(PlanManagerService.actions);

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.ACTION_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;
		case Constants.ACTION_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;
		case Constants.ACTION_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
