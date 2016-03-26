var TaskStore = require('../../stores/TaskStore');
var TaskActions = require('../../actions/TaskActions');

var entities = [];

var taskSteps = [];
taskSteps["create"] = function (doc) {
    TaskActions.create(doc);
}
taskSteps["update"] = function (doc) {
    TaskActions.update(doc);
}
taskSteps["destroy"] = function (doc) {
    TaskActions.destroy(doc);
}

entities["task"] = {
    store: TaskStore,
    steps: taskSteps,
}

module.exports = entities;
