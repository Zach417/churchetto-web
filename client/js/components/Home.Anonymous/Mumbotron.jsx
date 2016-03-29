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
  							<h3><b>Effortlessly manage assets</b></h3>
                <p style={Style.text}>
                  {"Churchetto provides must-have tools necessary "}
                  {"for utilizing your church's most value "}
                  {"assets--people."}
                </p>
  						</div>
    					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
  							<h3><b>Benchmark your progress</b></h3>
                <p style={Style.text}>
                  {"Churchetto will grow your church's congregation "}
                  {"by gathering data and benchmarking your results. "}
                </p>
  						</div>
    					<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
  							<h3><b>Get it done <i>fast</i></b></h3>
                <p style={Style.text}>
                  {"Churchetto is the most intuitive and the most powerful "}
                  {"church resource management system on the market. "}
                  {"It's easy to see what the big hub-bub is about. "}
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
