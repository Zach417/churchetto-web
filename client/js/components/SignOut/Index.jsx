var React = require('react');

var SignOut = React.createClass({
  componentWillMount: function () {
    return window.location.assign('/sign-out');
  },

  render: function () {
    return (
      <div />
    )
  },
});

module.exports = SignOut;
