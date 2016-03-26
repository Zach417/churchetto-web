var Moment = require('moment');

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var CalendarConstants = require('../constants/CalendarConstants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _selectedDate = Moment().startOf("day");

function changeSelectedDate(day) {
	_selectedDate = day.startOf("day");
}

var CalendarStore = assign({}, EventEmitter.prototype, {
	getSelectedDate: function() {
		return _selectedDate;
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
	var day;

	switch(action.actionType) {
		case CalendarConstants.CALENDAR_CHANGE:
			day = action.day;
			if (day !== '') {
				changeSelectedDate(day);
				CalendarStore.emitChange();
			}
			break;
	}
});

module.exports = CalendarStore;