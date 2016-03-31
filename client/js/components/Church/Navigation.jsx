var React = require('react');
var Style = require('./Style.jsx');
var ButtonSecondary = require('../Button/Index.jsx').Secondary;

var Church = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={Style.navigationContainer}>
        <div className="row-fluid">
          <ButtonSecondary label={"Info"} onClick={this.handleClick_Info} />
          <ButtonSecondary label={"Contact"} onClick={this.handleClick_Contact} />
          <ButtonSecondary label={"Members"} onClick={this.handleClick_Members} />
          <ButtonSecondary label={"Campuses"} onClick={this.handleClick_Campuses} />
        </div>
      </div>
    )
  },

  handleClick_Info: function () {
    this.props.handleChange("/info");
  },

  handleClick_Contact: function () {
    this.props.handleChange("/contact");
  },

  handleClick_Address: function () {
    this.props.handleChange("/address");
  },

  handleClick_Members: function () {
    this.props.handleChange("/members");
  },

  handleClick_Campuses: function () {
    this.props.handleChange("/campuses");
  },
});

module.exports = Church;
