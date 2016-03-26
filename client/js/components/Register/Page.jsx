var React = require('react');
var Style = require('./Style.jsx');
var RegisterComponent = require('./Index.jsx');

var RegisterPage = React.createClass({
	render: function () {
		return (
            <div style={Style.headerPadding} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <RegisterComponent children={this.props.children} />
            </div>
		)
	}
});

module.exports = RegisterPage;
