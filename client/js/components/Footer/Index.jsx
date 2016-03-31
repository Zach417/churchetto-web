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
            <li style={Style.listHeader}>Account</li>
            <ListItem label={"Profile"} to={"/profile"} />
            <ListItem label={"Password Reset"} to={"/password-reset"} />
            <ListItem label={"Settings"} to={"/settings"} />
          </ul>
          <ul style={Style.list} className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <li style={Style.listHeader}>Church</li>
            <ListItem label={"Churches"} to={"/church"} />
            <ListItem label={"Campuses"} to={"/campus"} />
            <ListItem label={"Members"} to={"/member"} />
          </ul>
          <ul style={Style.list} className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <li style={Style.listHeader}>Marketing</li>
            <ListItem label={"Leads"} to={"/lead"} />
            <ListItem label={"Opportunities"} to={"/opportunity"} />
            <ListItem label={"Members"} to={"/member"} />
            <ListItem label={"Campaigns"} to={"/campaign"} />
          </ul>
          <ul style={Style.list} className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <li style={Style.listHeader}>Info</li>
            <ListItem label={"About Us"} />
            <ListItem label={"Careers"} />
            <ListItem label={"Restful API"} />
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
