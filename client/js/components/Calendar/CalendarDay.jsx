var React = require('react');
var Moment = require('moment');

var CalendarActions = require('../../actions/CalendarActions.js');
var CalendarStore = require('../../stores/CalendarStore.js');

var CalendarDay = React.createClass({
	getInitialState: function () {
		return {
			day: ''
		}
	},

	componentWillMount: function () {
		this.setState({
			day: this.props.day
		});
	},

	render: function () {
		return (
			<span className={this.getClassName()} onClick={this.changeSelectedDate}>
                {this.state.day.date()}
            </span>
		)
	},

	getClassName: function () {
		var className = "calendar-day";

		if (this.isToday()) {
			className += " calendar-day-today";
		}

		if (!this.isCurrentMonth()){
			className += " calendar-day-different-month";
		}

		if (this.isSelected()){
			className += " calendar-day-selected";
		}

    	return className;
	},

	isSelected: function () {
		return (this.state.day.isSame(CalendarStore.getSelectedDate()));
	},

	isToday: function () {
		return (this.state.day.isSame(new Date(), "day"))
	},

	isCurrentMonth: function () {
		return (this.state.day.month() === CalendarStore.getSelectedDate().month())
	},

	changeSelectedDate: function () {
		CalendarActions.changeSelectedDate(this.state.day);
	}
});

module.exports = CalendarDay;