var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/TaskTypeConstants.js');

var Store = new StoreTemplate(PlanManagerService.taskTypes);

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.TASKTYPE_CREATE:
			Store.insert(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.TASKTYPE_UPDATE:
			Store.update(action.doc, function(data) {
				Store.emitChange();
			});
			break;

		case Constants.TASKTYPE_DESTROY:
			Store.delete(action.doc, function(data) {
				Store.emitChange();
			});
			break;
	}
});

module.exports = Store;
