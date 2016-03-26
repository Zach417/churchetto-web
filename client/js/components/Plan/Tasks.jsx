var React = require('react');

var Style = require('./Style.jsx');

var PlanTasks = React.createClass({
    render: function(){
    	var headingStyle = {
    		borderBottom: "2px solid #ccc",
    	};
        return (
            <div>
                <div className="container-fluid" style={Style.heading}>
                    <div className="row">
                        <span className="text-uppercase">Plan Tasks</span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = PlanTasks;