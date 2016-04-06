var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Style = require('./Style.jsx');

var Mumbotron = React.createClass({
  render: function() {
    return (
			<div className="container-fluid" style={Style.mumbotron}>
				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
          style={{padding:"0"}}>
          <div className="container-fluid">
  					<div className="row-fluid">
  						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
  							<h3 style={{margin:"0"}}><b>Open source</b></h3>
                <p style={Style.text}>
                  {"Source code for Churchetto is available on "}
                  <a href="https://github.com/Zach417/churchetto-web">
                    GitHub
                  </a>.
                </p>
  						</div>
    					<div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
  							<h3 style={{margin:"0"}}><b>{"Really free"}</b></h3>
                <p style={Style.text}>
                  {"No hidden costs or additional paid features. Seriously."}
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
