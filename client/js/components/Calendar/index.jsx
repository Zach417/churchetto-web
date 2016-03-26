var React = require('react');
var Moment = require('moment');

var CalendarDayNames = require('./CalendarDayNames.jsx');
var CalendarWeek = require('./CalendarWeek.jsx');

var CalendarActions = require('../../actions/CalendarActions.js');
var CalendarStore = require('../../stores/CalendarStore.js');

function getCalendarState() {
	return {
		month: CalendarStore.getSelectedDate()
	};
}

var Calendar = React.createClass({
    getInitialState: function() {
        return {
            month: ''
        }
    },

    componentWillMount: function () {
		this.setState(getCalendarState());
    },

	componentDidMount: function() {
		CalendarStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CalendarStore.removeChangeListener(this._onChange);
	},

    previous: function() {
        var month = this.state.month;
        month.add(-1, "M");
        this.setState({
            month: month
        });
    },

    next: function() {
        var month = this.state.month;
        month.add(1, "M");
        this.setState({
            month: month
        });
    },

    select: function(day) {
        this.setState({
            month: day.date
        });
    },

    render: function() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="calendar-header row">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-inline text-centered calendar-header-navigation-button" onClick={this.previous}>
                            {String.fromCharCode(9668)}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 text-inline text-centered">
                            <b>{this.renderMonthLabel()}</b>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 text-inline text-centered calendar-header-navigation-button" onClick={this.next}>
                            {String.fromCharCode(9658)}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <CalendarDayNames />
                </div>
                <div className="row">
                    {this.renderWeeks()}
                </div>
            </div>
        )
    },

    renderWeeks: function() {
        var weeks = [],
            done = false,
            date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
            monthIndex = date.month(),
            count = 0;

        while (!done) {
            weeks.push(
                <CalendarWeek key={date.toString()} startDate={date.clone()} />
            );
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    },

    renderMonthLabel: function() {
        return <span>{this.state.month.format("MMMM YY")}</span>;
    },

	_onChange: function() {
		this.setState(getCalendarState());
	}
});

module.exports = Calendar;