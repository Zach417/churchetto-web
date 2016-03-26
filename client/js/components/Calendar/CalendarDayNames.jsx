var React = require('react');
var Moment = require('moment');

var CalendarDayNames = React.createClass({
    render: function() {
        return (
            <div className="calendar-week-names">
                <span className="calendar-day-name">Su</span>
                <span className="calendar-day-name">Mo</span>
                <span className="calendar-day-name">Tu</span>
                <span className="calendar-day-name">We</span>
                <span className="calendar-day-name">Th</span>
                <span className="calendar-day-name">Fr</span>
                <span className="calendar-day-name">Sa</span>
            </div>
        )
    }
});

module.exports = CalendarDayNames;