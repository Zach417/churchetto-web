var React = require('react');

var Style = require('./Style.jsx');
var ListItem = require('./ListItem.jsx');

var Footer = React.createClass({
  render: function() {
    var today = new Date(Date.now());
    return (
      <div style={Style.container} className="row-fluid">
				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
  				<ul style={Style.list} className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <li style={Style.listHeader}>Get Started</li>
            <ListItem label={"Sign in"} to={"/sign-in"} />
            <ListItem label={"Sign up"} to={"/sign-up"} />
            <ListItem label={"Forgot password"} to={"/forgot-password"} />
          </ul>
          <ul style={Style.list} className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <li style={Style.listHeader}>Info</li>
            <ListItem label={"About Us"} />
            <ListItem label={"Careers"} />
            <ListItem label={"Restful API"} />
          </ul>
          <ul style={Style.list} className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <li style={Style.listHeader}>Resources</li>
            <ListItem label={"Webinars"} />
          </ul>
          <ul style={Style.list} className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <li style={Style.listHeader}>Connect</li>
            <ListItem label={"Facebook"} />
            <ListItem label={"Twitter"} />
            <ListItem label={"LinkedIn"} />
            <ListItem label={"YouTube"} />
          </ul>
  				<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  					<span style={{color: "#b3b3b3"}}>
              {"© Copyright " + today.getFullYear() + " Churchetto"}
              {" | zach@churchetto.com"}
              {" | 417.849.3612"}
              {" | Springfield, MO"}
  					</span>
  				</div>
  				<div style={{paddingTop:"10px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  					<span style={{color: "#b3b3b3"}}>
              {"Churchetto founded, built, and maintained by Zach Allen"}
  					</span>
  				</div>
				</div>
      </div>
    );
  }
});

module.exports = Footer;
