var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var NavigationConstants = require('../constants/NavigationConstants.js');
var assign = require('object-assign');
var browserHistory = require('react-router').browserHistory;

var CHANGE_EVENT = 'change';

var NavigationStore = assign({}, EventEmitter.prototype, {
	getCurrentPage: function () {
		return window.location.pathname;
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
		case NavigationConstants.NAVIGATION_CHANGE:
			browserHistory.push(action.page);
			NavigationStore.emitChange();
			break;
	}
});

module.exports = NavigationStore;