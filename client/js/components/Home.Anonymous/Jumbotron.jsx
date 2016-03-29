var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Style = require('./Style.jsx');

var Jumbotron = React.createClass({
  render: function() {
    return (
			<div className="row-fluid" style={Style.jumbotron}>
				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0"}}>
					<h1 style={{margin:"0"}}>{this.props.heading}</h1>
					<h2 style={{margin:"0"}}>{this.props.subHeading}</h2>
				</div>
			</div>
    );
  },
});

module.exports = Jumbotron;
