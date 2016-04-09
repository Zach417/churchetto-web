var React = require('react');
var Style = require('./Style.jsx');
var Contribution = require('./Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Page = React.createClass({
  getInitialState: function () {
    return {
      church: {_id:''},
      contribution: {_id:''},
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      var contribution = ChurchStore.getSubDocFromChurch(doc, "contributions",
        this.props.params.mid);
      this.setState({
        church: doc,
        contribution: contribution,
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
        <Contribution
          church={this.state.church}
          contribution={this.state.contribution}
          children={this.props.children} />
      </div>
    )
  },
});

module.exports = Page;
