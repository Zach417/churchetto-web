var React = require('react');
var Style = require('./Style.jsx');
var Member = require('./Index.jsx');
var ModalWindow = require('../ModalWindow/Index.jsx');
var ChurchStore = require('../../stores/ChurchStore');

var Page = React.createClass({
  getInitialState: function () {
    return {
      church: {_id:''},
      member: {_id:''},
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.params.id, function (doc) {
      var member = ChurchStore.getMemberFromChurch(doc, this.props.params.mid);
      this.setState({
        church: doc,
        member: member,
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
        <Member
          church={this.state.church}
          member={this.state.member}
          children={this.props.children} />
      </div>
    )
    return (
      <ModalWindow content={content} parentPath={"/church/" + this.state.church._id + "/member"} />
    )
  },
});

module.exports = Page;
