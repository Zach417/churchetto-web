var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var PlanManagerService = require('../services/PlanManagerService').tasks;
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Constants = require('../constants/TaskConstants.js');

var CHANGE_EVENT = 'change';

var _docs = [];

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

var TaskStore = assign({}, EventEmitter.prototype, {
	get: function (callback) {
		if (_docs.length === 0) {
			PlanManagerService.get(function (tasks) {
				_docs = tasks;
				callback(_docs);
			});
		} else {
			callback(_docs);
		}
	},

	getTask: function (id, callback) {
		if (_docs.length === 0) {
			PlanManagerService.getOne(id, callback);
		} else {
			for (var i = 0; i < _docs.length; i++) {
				if (_docs[i]._id == id) {
					return callback(_docs[i]);
				}
			}
		}
	},

	getInvestmentTasks: function (callback) {
		if (_docs.length === 0) {
			PlanManagerService.get(function (tasks) {
				_docs = tasks;
				getTasksWithCategory(_docs, "56bcb5351f3d76082bb8ef7f", function (investmentTasks) {
					callback(investmentTasks);
				});
			});
		} else {
			getTasksWithCategory(_docs, "56bcb5351f3d76082bb8ef7f", function (investmentTasks) {
				callback(investmentTasks);
			});
		}
	},

	getVendorTasks: function (callback) {
		if (_docs.length === 0) {
			PlanManagerService.get(function (tasks) {
				_docs = tasks;
				getTasksWithCategory(_docs, "56bcb5511f3d76082bb8ef80", function (vendorTasks) {
					callback(vendorTasks);
				});
			});
		} else {
			getTasksWithCategory(_docs, "56bcb5511f3d76082bb8ef80", function (vendorTasks) {
				callback(vendorTasks);
			});
		}
	},

	getAdministrationTasks: function (callback) {
		if (_docs.length === 0) {
			PlanManagerService.get(function (tasks) {
				_docs = tasks;
				getTasksWithCategory(_docs, "56bcb3a5777f0d4c1cb43982", function (administrationTasks) {
					callback(administrationTasks);
				});
			});
		} else {
			getTasksWithCategory(_docs, "56bcb3a5777f0d4c1cb43982", function (administrationTasks) {
				callback(administrationTasks);
			});
		}
	},

	getPlanTasks: function (planId, callback) {
		if (_docs.length === 0) {
			PlanManagerService.get(function (tasks) {
				_docs = tasks;
				var planTasks = filterTasksForPlan(_docs, planId);
				callback(planTasks);
			});
		} else {
			var planTasks = filterTasksForPlan(_docs, planId);
			callback(planTasks);
		}
	},

	insert: function (task, callback) {
		PlanManagerService.insert(task, callback);
	},

	update: function (task, callback) {
		PlanManagerService.update(task, callback);
	},

	delete: function (task, callback) {
		PlanManagerService.delete(task, callback);
	},

	emitChange: function() {
		PlanManagerService.get(function (tasks) {
			_docs = tasks;
			this.emit(CHANGE_EVENT);
		}.bind(this));
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

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
