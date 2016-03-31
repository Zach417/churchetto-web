var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var Info = require('./Info.jsx');
var Contact = require('./Contact.jsx');
var Address = require('./Address.jsx');
var Members = require('./Members.jsx');
var Campuses = require('./Campuses.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var UserStore = require('../../stores/UserStore');
var ChurchStore = require('../../stores/ChurchStore');
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (church) {
  if (!church.phone) {
    church.phone = {};
  }

  if (!church.fax) {
    church.fax = {};
  }

  if (!church.address) {
    church.address = {};
  }

  return church;
}

var Church = React.createClass({
  getInitialState: function () {
    return {
      church: resolveSubDocuments({}),
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
        church: resolveSubDocuments({}),
        route: this.state.route,
        isLoading: false,
      });
    }

    ChurchStore.getOne(id, function (doc) {
      this.setState({
        church: resolveSubDocuments(doc),
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
    if (this.state.isLoading === true) {
      return (
        <div style={Style.pageContainer}>
    			<div className="row-fluid" style={Style.jumbotron}>
    				<div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered"
              style={{padding:"0"}}>
              <img src="/img/wait" />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>{this.state.church.name}</h1>
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
          <Info church={this.state.church} handleChange={this.handleChange_Data} />
        )
        break;
      case "/contact":
        return (
          <Contact church={this.state.church} handleChange={this.handleChange_Data} />
        )
        break;
      case "/members":
        return (
          <Members church={this.state.church} />
        )
        break;
      case "/campuses":
        return (
          <Campuses church={this.state.church} />
        )
        break;
    }
  },

  handleChange_Data: function (church) {
    this.setState({
      church: resolveSubDocuments(church),
      route: this.state.route,
      isLoading: false,
    })
  },

  handleChange_Navigation: function (route) {
    this.setState({
      church: this.state.church,
      route: route,
      isLoading: this.state.isLoading,
    })
  },

  handleClick_Submit: function () {
    window.scrollTo(0, 0);
    if (!this.state.church._id) {
      ChurchActions.create(this.state.church);
      browserHistory.push("/church");
    } else {
      ChurchActions.update(this.state.church);
      browserHistory.push("/church");
    }
  },

  handleClick_Delete: function () {
    window.scrollTo(0, 0);
    ChurchActions.destroy(this.state.church);
    browserHistory.push("/church");
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

module.exports = Church;
