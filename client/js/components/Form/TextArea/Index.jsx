var React = require('react');
var Style = require('./Style.jsx');

var FormInput = React.createClass({
  render: function() {
    return (
      <textarea
        style={Style.textarea}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange} />
    )
  },
});

module.exports = FormInput;
