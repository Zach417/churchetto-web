var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Member = require('./Index.jsx');
var BackButton = require('./Back.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Page = React.createClass({
  getInitialState: function () {
    return {
      id: ''
    }
  },

  componentWillMount: function () {
    if (this.props.params && this.props.params.id) {
      this.setState({
        id: this.props.params.id
      });
    } else {
      this.setState({
        id: ''
      });
    }
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function () {
    return (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <Member id={this.state.id} />
      </div>
    )
  },
});

module.exports = Page;
