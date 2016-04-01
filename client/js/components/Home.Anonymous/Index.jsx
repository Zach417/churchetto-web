var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Style = require('./Style.jsx');
var Jumbotron = require('./Jumbotron.jsx');
var Mumbotron = require('./Mumbotron.jsx');

var HomePage = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div style={Style.container}>
				<Jumbotron
          heading={"Churchetto = management software for churches"}
          subHeading={"it's free for all congregations under 7.4 billion members"} />
        <Mumbotron />
      </div>
    );
  },
});

module.exports = HomePage;
