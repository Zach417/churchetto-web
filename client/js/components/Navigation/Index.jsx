var React = require('react');
var Style = require('./Style.jsx');
var LinkItem = require('./LinkItem.jsx');

var Navigation = React.createClass({
  render: function () {
    return (
      <div style={Style.container}>
          <LinkItem label="Home" link="/" backgroundColor="#e6e6e6" backgroundColorHover="#d9d9d9" />
          <LinkItem label="Churches" link="/church" backgroundColor="#e6e6e6" backgroundColorHover="#d9d9d9" />
      </div>
    )
  }
});

module.exports = Navigation;
