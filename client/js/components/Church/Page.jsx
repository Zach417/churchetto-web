var React = require('react');
var Style = require('./Style.jsx');
var Church = require('./Index.jsx');

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
        <Church id={this.state.id} />
      </div>
    )
  },
});

module.exports = Page;
