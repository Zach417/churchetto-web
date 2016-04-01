var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonSecondaryLarge = require('../Button/Index.jsx').Secondary.Large;

var Church = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={Style.navigationContainer}>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 hidden-xs" style={{padding:"0"}}>
            <ButtonSecondaryLarge label={"Info"} onClick={this.handleClick_Info} />
            <ButtonSecondaryLarge label={"Contact"} onClick={this.handleClick_Contact} />
            <ButtonSecondaryLarge label={"Members"} onClick={this.handleClick_Members} />
            <ButtonSecondaryLarge label={"Campuses"} onClick={this.handleClick_Campuses} />
          </div>
          <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{padding:"0"}}>
            <div style={Style.extraSmallNavigationContainer}
              onClick={this.handleClick_Info}>Info</div>
            <div style={Style.extraSmallNavigationContainer}
              onClick={this.handleClick_Contact}>Contact</div>
            <div style={Style.extraSmallNavigationContainer}
              onClick={this.handleClick_Members}>Members</div>
            <div style={Style.extraSmallNavigationContainer}
              onClick={this.handleClick_Campuses}>Campuses</div>
        </div>
      </div>
    </div>
    )
  },

  handleClick_Info: function () {
    browserHistory.push("/church/" + this.props.id + "/info");
  },

  handleClick_Contact: function () {
    browserHistory.push("/church/" + this.props.id + "/contact");
  },

  handleClick_Members: function () {
    browserHistory.push("/church/" + this.props.id + "/member");
  },

  handleClick_Campuses: function () {
    browserHistory.push("/church/" + this.props.id + "/campus");
  },
});

module.exports = Church;
