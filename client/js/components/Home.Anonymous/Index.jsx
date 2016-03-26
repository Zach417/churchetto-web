var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Style = require('./Style.jsx');

var HomePage = React.createClass({
  render: function() {
    return (
      <div style={Style.container}>
				<div className="row-fluid" style={Style.jumbotron}>
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
            style={{padding:"0"}}>
						<h1 style={{margin:"0"}}>{"Is your church in allegretto?"}</h1>
						<h3 style={{margin:"0"}}>{"Get back in tempo with Churchetto."}</h3>
					</div>
				</div>
				<div className="row-fluid" style={Style.mumbotron}>
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
            style={{padding:"0"}}>

					</div>
				</div>
				<div className="row-fluid" style={Style.mumbotron}>
					<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
            style={{padding:"0"}}>
						<div className="row-fluid">
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                  style={{backgroundColor:"#f4f4f4"}}>
								<h3>{"Effortlessly manage assets"}</h3>
								<p style={Style.detail}>
									alskdfjasl kdfjasdlkfjaslkdjflka jsdflkajsdfl ajsdfasldfj
                  aslkdfaskldf jaslkf jaslf kajsdfkl asjf klas fl
								</p>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                  style={{backgroundColor:"#f4f4f4"}}>
								<h3>{"Benchmark your progress"}</h3>
								<p style={Style.detail}>
									asldkfjas lkdfajsdlfja sldkfjaslkdfj alskdfjalsdfj asldkfj
								</p>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-12"
                  style={{backgroundColor:"#f4f4f4"}}>
								<h3>{"Get it done right the first time"}</h3>
								<p style={Style.detail}>
									asdf laksjdf lasdkfalsdkf jaslkdfjaslkdfj asdlkfjasdlkf
                  asdlfkajsdfla jsdlkfjasdlfkajsld f
								</p>
							</div>
						</div>
					</div>
				</div>
      </div>
    );
  },
});

module.exports = HomePage;
