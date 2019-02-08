var React = require('react');
var Link = require('react-router').Link;
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
      var campus = ChurchStore.getSubDocFromChurch(doc, "campuses",
        this.props.params.mid);
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
    return (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <div style={Style.componentContainer}>
          <Link to={"/church/" + this.state.church._id + "/campus"}>
            {"< Back to church campuses"}
          </Link>
        </div>
        <Campus
          church={this.state.church}
          campus={this.state.campus}
          children={this.props.children} />
      </div>
    )
  },
});

module.exports = Page;
