var React = require('react');
var Style = require('./Style.jsx');
var Campus = require('./Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Page = React.createClass({
  getInitialState: function () {
    return {
      church: {_id:''},
      campus: {_id:''},
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      var campus = ChurchStore.getCampusFromChurch(doc, this.props.params.mid);
      this.setState({
        church: doc,
        campus: campus,
      });
    }.bind(this));
  },

  componentDidMount: function () {
    window.scrollTo(0, 0);
  },

  render: function () {
    var content = (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <Campus
          church={this.state.church}
          campus={this.state.campus}
          children={this.props.children} />
      </div>
    )
    return (
      <ModalWindow content={content} parentPath={"/church/" + this.state.church._id + "/campus"} />
    )
  },
});

module.exports = Page;
