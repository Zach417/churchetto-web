var React = require('react');
var Style = require('./Style.jsx');
var Event = require('./Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Page = React.createClass({
  getInitialState: function () {
    return {
      church: {_id:''},
      event: {_id:''},
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      var event = ChurchStore.getSubDocFromChurch(doc, "events",
        this.props.params.mid);
      this.setState({
        church: doc,
        event: event,
      });
    }.bind(this));
  },

  componentDidMount: function () {
    window.scrollTo(0, 0);
  },

  render: function () {
    return (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <Event
          church={this.state.church}
          event={this.state.event}
          children={this.props.children} />
      </div>
    )
  },
});

module.exports = Page;
