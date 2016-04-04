var React = require('react');
var Style = require('./Style.jsx');
var Event = require('./Index.jsx');
var Label = require('../Form/Index.jsx').Label;
var Select = require('../Form/Index.jsx').Select;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ChurchettoData = require('../../services/ChurchettoData');

var Page = React.createClass({
  getInitialState: function () {
    return {
      roles: '',
      selectedRole: '',
    }
  },

  componentWillMount: function () {
    ChurchettoData.checkVolunteerRolesForEvent({
      eventId: this.props.params.id,
      token: this.props.params.token,
    }, function (data) {
      this.setState({
        roles: data.roles,
      });
    }.bind(this));
  },

  componentDidMount: function () {
    window.scrollTo(0, 0);
  },

  render: function () {
    if (this.state.success === true) {
      return (
        <div style={Style.pageContainer}
          className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
          <div style={Style.componentContainerNoPadding}>
            <div style={{padding:"0 20px 0 20px"}}>
              <h1 style={{wordBreak:"break-word"}}>
                Volunteer Opportunities
              </h1>
            </div>
            <div style={{padding:"0 20px 20px 20px"}}>
              <div className="row-fluid" style={Style.detailColumn}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  style={Style.detailColumn}>
                  <p>
                    Successfully registered! Thanks!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.roles.length === 0) {
      return (
        <div style={Style.pageContainer}
          className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
          <div style={Style.componentContainerNoPadding}>
            <div style={{padding:"0 20px 0 20px"}}>
              <h1 style={{wordBreak:"break-word"}}>
                Volunteer Opportunities
              </h1>
            </div>
            <div style={{padding:"0 20px 20px 20px"}}>
              <div className="row-fluid" style={Style.detailColumn}>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  style={Style.detailColumn}>
                  <p>
                    It looks like all of the volunteer opportunities
                    have already been filled. We do not have anything
                    for you to do at this event, any longer. Thank you
                    for taking an interest in volunteering!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <div style={Style.componentContainerNoPadding}>
          <div style={{padding:"0 20px 0 20px"}}>
            <h1 style={{wordBreak:"break-word"}}>
              Volunteer Opportunities
            </h1>
          </div>
          <div style={{padding:"0 20px 20px 20px"}}>
            <div className="row-fluid" style={Style.detailColumn}>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                style={Style.detailColumn}>
                <Label isRequired={true} label={"Selected Role"} />
                <Select
                  type={"text"}
                  value={this.state.selectedRole}
                  options={this.getRoles()}
                  onChange={this.handleChange_SelectedRole} />
              </div>
            </div>
          </div>
          <div style={{padding:"0 20px 20px 20px"}}>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={Style.detailColumn}>
              <ButtonPrimary label={"Submit"} onClick={this.handleClick_Submit} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  getRoles: function () {
    if (!this.state.roles) {
      return [];
    }
    var result = [];
    for (var i = 0; i < this.state.roles.length; i++) {
      result.push(this.state.roles[i]);
    }
    return result;
  },

  handleChange_SelectedRole: function (event) {
    this.setState({
      roles: this.state.roles,
      selectedRole: event.target.value,
    });
  },

  handleClick_Submit: function (event) {
    if (!this.state.selectedRole) {
      return;
    }
    ChurchettoData.acceptVolunteerForEvent({
      eventId: this.props.params.id,
      token: this.props.params.token,
      role: this.state.selectedRole,
    }, function (data) {
      this.setState({
        roles: this.state.roles,
        selectedRole: this.state.selectedRole,
        success: true,
      })
    }.bind(this));
  },
});

module.exports = Page;
