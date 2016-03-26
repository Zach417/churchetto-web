var React = require('react');
var Moment = require('moment');

var CalendarDay = require('./CalendarDay.jsx');

var CalendarWeek = React.createClass({
	getInitialState: function () {
		return {
			startDate: ''
		}
	},

	componentWillMount: function () {
		this.setState({
			startDate: this.props.startDate
		});
	},

    render: function() {
        var days = [];
        var date = this.state.startDate;
        var month = this.state.startDate.month();

        for (var i = 0; i < 7; i++) {
			days.push(
				<CalendarDay key={date.toString()} day={Moment(date)} />
			);
            date = date.clone();
            date.add(1, "d");
        }

        return (
            <div className="calendar-week" key={days[0].toString()}>
                {days}
            </div>
        )
    }
});

module.exports = CalendarWeek;