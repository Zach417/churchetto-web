var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Style = require('./Style.jsx');

var Mumbotron = React.createClass({
  render: function() {
    return (
			<div className="row-fluid" style={Style.mumbotron}>
				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0"}}>
          <div className="container-fluid">
  					<div className="row-fluid">
  						<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
  							<h3><b>Effortlessly manage</b></h3>
                <p style={Style.text}>
                  {"Must-have tools for organizing your "}
                  {"church's most value assets--people."}
                </p>
  						</div>
    					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
  							<h3><b>{"Always, completely free"}</b></h3>
                <p style={Style.text}>
                  {"Manage as many organizations with as many "}
                  {"members that you want for free. "}
                </p>
  						</div>
    					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
  							<h3><b>Get it done <i>fast</i></b></h3>
                <p style={Style.text}>
                  {"The most intuitive, most powerful church "}
                  {"management system on the market. "}
                </p>
  						</div>
  					</div>
          </div>
				</div>
			</div>
    );
  },
});

module.exports = Mumbotron;
