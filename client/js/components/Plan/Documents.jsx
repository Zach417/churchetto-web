var React = require('react');

var PlanDocuments = React.createClass({
    render: function(){
    	var headingStyle = {
    		borderBottom: "2px solid #ccc",
    	};
        return (
            <div>
                <div className="container-fluid" style={headingStyle}>
                    <div className="row">
                        <span className="text-uppercase">Plan Documents</span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = PlanDocuments;