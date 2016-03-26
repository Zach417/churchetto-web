var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var CalendarConstants = require('../constants/CalendarConstants.js');

var CalendarActions = {
	changeSelectedDate: function(day) {
		AppDispatcher.dispatch({
			actionType: CalendarConstants.CALENDAR_CHANGE,
			day: day
		});
	}
};

module.exports = CalendarActions;