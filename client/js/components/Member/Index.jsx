var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Info = require('./Info.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var MemberStore = require('../../stores/MemberStore');
var MemberActions = require('../../actions/MemberActions');

function resolveSubDocuments (member) {
  if (!member.phone) {
    member.phone = {};
  }

  if (!member.address) {
    member.address = {};
  }

  return member;
}

var Member = React.createClass({
  getInitialState: function () {
    return {
      member: resolveSubDocuments({}),
      route: "/info",
      isLoading: true,
    }
  },

  componentWillMount: function () {
    var id;

    if (this.props.id) {
      id = this.props.id;
    } else {
      return this.setState({
        member: resolveSubDocuments({}),
        route: this.state.route,
        isLoading: false,
      });
    }

    MemberStore.getOne(id, function (doc) {
      this.setState({
        member: resolveSubDocuments(doc),
        route: this.state.route,
        isLoading: false,
      });
    }.bind(this));
  },

  componentWillReceiveProps: function () {
    this.componentWillMount();
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function () {
    return (
      <div style={Style.componentContainer}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>{this.state.member.firstName}</h1>
        </div>
        <div style={{margin:"0 0 20px 0",backgroundColor: "#666666"}}>
          <Navigation handleChange={this.handleChange_Navigation} />
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          {this.getCurrentComponent()}
          <div className="container-fluid">
            <div className="row-fluid" style={{padding:"15px 0"}}>
              <ButtonPrimary label={"Save"} onClick={this.handleClick_Submit} />
              <span style={{display:"inline-block",width:"5px"}} />
              <ButtonDanger label={"Delete"} onClick={this.handleClick_Delete} />
            </div>
          </div>
          {this.getErrorMessage()}
        </div>
      </div>
    )
  },

  getCurrentComponent: function () {
    switch (this.state.route) {
      case "/info":
        return (
          <Info member={this.state.member} handleChange={this.handleChange_Data} />
        )
        break;
    }
  },

  handleChange_Data: function (member) {
    this.setState({
      member: resolveSubDocuments(member),
      route: this.state.route,
      isLoading: false,
    })
  },

  handleChange_Navigation: function (route) {
    this.setState({
      member: this.state.member,
      route: route,
      isLoading: this.state.isLoading,
    })
  },

  handleClick_Submit: function () {
    window.scrollTo(0, 0);
    if (!this.state.member._id) {
      MemberActions.create(this.state.member);
    } else {
      MemberActions.update(this.state.member);
    }
  },

  handleClick_Delete: function () {
    window.scrollTo(0, 0);
    MemberActions.destroy(this.state.member);
  },

  getErrorMessage: function () {
    if (this.state.error) {
      return (
        <div className="container-fluid" style={Style.sectionContainer}>
          <div className="row-fluid" style={{color: "#c36b74",paddingTop: "5px"}}>
            {this.state.error}
          </div>
        </div>
      )
    }
  },
});

module.exports = Member;
