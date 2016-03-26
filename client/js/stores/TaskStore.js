var StoreTemplate = require('./Template');
var PlanManagerService = require('../services/PlanManagerService');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/TaskConstants.js');

var TaskTypeStore = require('./TaskTypeStore');

function getTasksWithCategory (tasks, taskCategoryId, callback) {
	var result = [];
	for(var i = 0 ; i < tasks.length; i++) {
		var task = tasks[i];
		if (task.taskTypeId) {
		    TaskTypeStore.get(function (docs) {
		        for (var i = 0; i < docs.length; i++) {
		            if (docs[i]._id == task.taskTypeId && docs[i].taskCategoryId == taskCategoryId) {
						result.push(task);
					}
				}
				callback(result);
			});
		} else {
			callback(result);
		}
	}
}

function filterTasksForPlan (tasks, planId) {
	var tasksForPlan = [];
	for(var i = 0 ; i < tasks.length; i++) {
		var task = tasks[i];
		if (task.planId == planId) {
			tasksForPlan.push(task);
		}
	}
	return tasksForPlan;
}

var TaskStore = new StoreTemplate(PlanManagerService.tasks);

TaskStore.getInvestmentTasks = function (callback) {
	TaskStore.get(function (docs) {
		getTasksWithCategory(docs, "56bcb5351f3d76082bb8ef7f", function (filteredDocs) {
			callback(filteredDocs);
		});
	});
};

TaskStore.getVendorTasks = function (callback) {
	TaskStore.get(function (docs) {
		getTasksWithCategory(docs, "56bcb5511f3d76082bb8ef80", function (filteredDocs) {
			callback(filteredDocs);
		});
	});
};

TaskStore.getAdministrationTasks = function (callback) {
	TaskStore.get(function (docs) {
		getTasksWithCategory(docs, "56bcb3a5777f0d4c1cb43982", function (filteredDocs) {
			callback(filteredDocs);
		});
	});
};

TaskStore.getPlanTasks = function (planId, callback) {
	TaskStore.get(function (docs) {
		var planTasks = filterTasksForPlan(docs, planId);
		callback(planTasks);
	});
};

AppDispatcher.register(function(action) {
	switch(action.actionType) {
		case Constants.TASK_CREATE:
			TaskStore.insert(action.doc, function(data) {
				TaskStore.emitChange();
			});
			break;

		case Constants.TASK_UPDATE:
			TaskStore.update(action.doc, function(data) {
				TaskStore.emitChange();
			});
			break;

		case Constants.TASK_DESTROY:
			TaskStore.delete(action.doc, function(data) {
				TaskStore.emitChange();
			});
			break;
	}
});

module.exports = TaskStore;
