var React = require('react');
var Moment = require('moment');

var Style = require('./Style.jsx');

var Calendar = require('../Calendar/index.jsx');

var ComplianceCalendar = React.createClass({
    render: function () {
        return (
	        <div style={Style.container}>
	            <div style={Style.label}>
	            	<b>Compliance Calandar</b>
	            </div>
	            <div style={Style.body}>
	            	<Calendar />
	            </div>
	        </div>
        )
    }
});

module.exports = ComplianceCalendar;