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
					<h1 style={{margin:"0"}}>{"Does your church stride in allegretto?"}</h1>
					<h2 style={{margin:"0"}}>{"Get back in tempo with Churchetto."}</h2>
				</div>
			</div>
    );
  },
});

module.exports = Jumbotron;
