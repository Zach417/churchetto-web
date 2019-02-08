var React = require('react');
var Style = require('./Style.jsx');

var Register = React.createClass({
  render: function() {
    return (
      <div style={Style.container}>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Register;
