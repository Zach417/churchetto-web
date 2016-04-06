var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');

var Style = require('./Style.jsx');
var Jumbotron = require('./Jumbotron.jsx');
var Mumbotron = require('./Mumbotron.jsx');
var Gumbotron = require('./Gumbotron.jsx');

var HomePage = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div style={Style.container}>
				<Jumbotron
          heading={"Software for churches and small groups"}
          subHeading={"it's free for organizations of all shapes and sizes"} />
  			<Gumbotron />
        <Mumbotron />
				<Jumbotron
          heading={"Sign up is simple and easy"}
          subHeading={"you don't even have to talk to a salesperson"} />
      </div>
    );
  },
});

module.exports = HomePage;
