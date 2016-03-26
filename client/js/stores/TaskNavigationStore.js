var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TaskNavigationConstants = require('../constants/TaskNavigationConstants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _pages = [];
_pages[0] = {
	name: "Summary"
}
_pages[1] = {
	name: "Meetings"
}
_pages[2] = {
	name: "People"
}
_pages[3] = {
	name: "Documents"
}

var _currentPage = _pages[0];

var TaskNavigationStore = assign({}, EventEmitter.prototype, {
	getCurrentPage: function () {
		return _currentPage;
	},

	setCurrentPage: function (page) {
		_currentPage = page;
	},

	getPages: function () {
		return _pages;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
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
		case TaskNavigationConstants.TASKNAVIGATION_CHANGE:
			var page = action.page;
			TaskNavigationStore.setCurrentPage(page);
			TaskNavigationStore.emitChange();
			break;
	}
});

module.exports = TaskNavigationStore;