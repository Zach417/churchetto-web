var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/TaskCategoryConstants.js');

var TaskCategoryStore = new StoreTemplate(PlanManagerService.taskCategories);

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.TASKCATEGORY_CREATE:
			TaskCategoryStore.insert(action.doc, function(data) {
				TaskCategoryStore.emitChange();
			});
			break;

		case Constants.TASKCATEGORY_UPDATE:
			TaskCategoryStore.update(action.doc, function(data) {
				TaskCategoryStore.emitChange();
			});
			break;

		case Constants.TASKCATEGORY_DESTROY:
			TaskCategoryStore.delete(action.doc, function(data) {
				TaskCategoryStore.emitChange();
			});
			break;
	}
});

module.exports = TaskCategoryStore;
