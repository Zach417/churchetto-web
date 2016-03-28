var React = require('react');
var Style = require('./Style.jsx');

var FormInput = React.createClass({
  render: function() {
    return (
      <input
        style={Style.input}
        value={this.props.value}
        type={this.props.type}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}/>
    )
  },
});

module.exports = FormInput;
