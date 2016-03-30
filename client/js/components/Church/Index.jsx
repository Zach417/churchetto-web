var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Info = require('./Info.jsx');
var Contact = require('./Contact.jsx');
var Address = require('./Address.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var UserStore = require('../../stores/UserStore');
var ChurchStore = require('../../stores/ChurchStore');



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
      isLoading: true,
    }
  },

  componentWillMount: function () {
    var id = this.props.id;
    if (!this.props.id) {
      id = this.props.params.id;
    }

    ChurchStore.getOne(id, function (doc) {
      if (!doc) {
        return this.setState({
          church: resolveSubDocuments({}),
          isLoading: false,
        });
      }

      this.setState({
        church: resolveSubDocuments(doc),
        isLoading: false,
      });
    }.bind(this));
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
      <div style={Style.pageContainer}>
        <div style={Style.componentContainer} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
          <h1>{"Fantastic Church"}</h1>
          <Info church={this.state.church} handleChange={this.handleChange} />
          <Contact church={this.state.church} handleChange={this.handleChange} />
          <Address church={this.state.church} handleChange={this.handleChange} />
          <div className="container-fluid" style={Style.sectionContainer}>
            <div className="row-fluid" style={{padding:"15px 0"}}>
              <ButtonPrimary label={"Save"} onClick={this.handleClick_Submit} />
              <span style={{display:"inline-block",width:"5px"}} />
              <ButtonSecondary label={"Cancel"} />
              <span style={{display:"inline-block",width:"5px"}} />
              <ButtonDanger label={"Delete"} onClick={this.handleClick_Delete} />
            </div>
          </div>
          {this.getErrorMessage()}
        </div>
      </div>
    )
  },

  handleChange: function (church) {
    this.setState({
      church: resolveSubDocuments(church),
      isLoading: false,
    })
  },

  handleClick_Submit: function () {
    window.scrollTo(0, 0);
    if (!this.state.church._id) {
      this.setState({
        church: this.state.church,
        isLoading: true,
      });
      ChurchStore.insert(this.state.church, function (doc) {
        UserStore.getCurrentUser(function (user) {
          if (!user.churches) { user.churches = []; }
          user.churches.push(doc._id);
          UserStore.update(user, function (user) {
            browserHistory.push("/church/" + doc._id);
            this.setState({
              church: resolveSubDocuments(doc),
              isLoading: false,
            });
          }.bind(this));
        }.bind(this));
      }.bind(this));
    } else {
      this.setState({
        church: this.state.church,
        isLoading: true,
      });
      ChurchStore.update(this.state.church, function (doc) {
        this.setState({
          church: this.state.church,
          isLoading: false,
        });
      }.bind(this));
    }
  },

  handleClick_Delete: function () {
    window.scrollTo(0, 0);
    this.setState({
      church: this.state.church,
      isLoading: true,
    });
    ChurchStore.delete(this.state.church, function (doc) {
      this.setState({
        church: resolveSubDocuments({}),
        isLoading: false,
      });
    }.bind(this));
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
