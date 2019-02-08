var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var Ruler = React.createClass({
  render: function() {
    return (
      <div
        style={Style.container}
        onMouseEnter={this.handleMouseEnter_Container}
        onMouseLeave={this.handleMouseLeave_Container}>
        <div style={Style.header}/>
        <div style={this.getBodyStyle()}>
          <ul style={this.getRulerStyle()}>
            <li style={Style.rulerItem}>1</li>
            <li style={Style.rulerItem}>2</li>
            <li style={Style.rulerItem}>3</li>
            <li style={Style.rulerItem}>4</li>
            <li style={Style.rulerItem}>5</li>
            <li style={Style.rulerItem}>6</li>
            <li style={Style.rulerItem}>7</li>
            <li style={Style.rulerItem}>8</li>
            <li style={Style.rulerItem}>9</li>
            <li style={Style.rulerItem}>10</li>
          </ul>
        </div>
      </div>
    )
  },

  getBodyStyle: function () {
    var result = $.extend(true, {}, Style.body);
    result.width = this.props.report.size.x;
    return result;
  },

  getRulerStyle: function () {
    var result = $.extend(true, {}, Style.ruler);
    result.width = this.props.report.size.x;
    return result;
  },
});

module.exports = Ruler;
