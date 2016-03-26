var React = require('react');

var Style = require('./Style.jsx');

var FeedReminders = React.createClass({
    render: function(){
        return (
    		<div>
	            <div style={Style.container}>
	                <div style={Style.label}>
	                	Industry Updates
	                </div>
	                <div style={Style.body}>
	                	<ul>
		                	<li><a>Fourth Quarter 2015 Capital Markets Update</a></li>
		                	<li><a>NOW is the Time to Prepare for the New Money Market Rules</a></li>
		                	<li><a>What Does Record Keeper Consolidation Mean for You as a Plan Sponsor?</a></li>
	                	</ul>
	                </div>
	            </div>
	        </div>
        )
    }
});

module.exports = FeedReminders;