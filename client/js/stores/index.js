var ActionStore = require('./ActionStore');
var PlanStore = require('./PlanStore');
var TaskCategoryStore = require('./TaskCategoryStore');
var TaskStore = require('./TaskStore');
var TaskTypeStore = require('./TaskTypeStore');
var UserStore = require('./UserStore');

var Service = {
	actions: ActionStore,
	plans: PlanStore,
	tasks: TaskStore,
	taskCategories: TaskCategoryStore,
	taskTypes: TaskTypeStore,
	users: UserStore,
}

module.exports = Service;
