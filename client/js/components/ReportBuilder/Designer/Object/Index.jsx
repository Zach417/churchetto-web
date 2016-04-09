var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var Segment = React.createClass({
  render: function () {
    return (
      <div style={this.getStyle()}>
        {this.getValue()}
      </div>
    )
  },

  getValue: function () {
    return this.props.reportObject.value;
  },

  getStyle: function () {
    var result = $.extend(true, {}, Style.container);
    if (this.props.reportObject.style) {
      for (var key in this.props.reportObject.style) {
        if (!this.props.reportObject.style.hasOwnProperty(key)) continue;
        result[key] = this.props.reportObject.style[key];
      }
    }
    result.position = "absolute";
    result.overflow = "hidden";
    result.cursor = "move";
    return result;
  },
});

module.exports = Segment;
