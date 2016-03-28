var React = require('react');
var Style = require('./Style.jsx');
var Banner = require('./Banner.jsx');
var Highlights = require('./Highlights.jsx');

var Register = React.createClass({
  render: function() {
    return (
      <div style={Style.container}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style={{padding: "35px 0"}}>
					<h1 style={{margin:"0"}}>{"Join Churchetto"}</h1>
					<h3 style={{margin:"0"}}>{"You'll wonder how you ever managed without it"}</h3>
        </div>
        <div style={Style.register}>
          <div style={Style.loginForm} className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            {this.props.children}
          </div>
          <div style={Style.rightColumn} className="col-lg-4 col-md-4 hidden-sm hidden-xs">
            <Highlights />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Register;
