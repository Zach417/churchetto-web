var React = require('react');
var moment = require('moment');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Info = require('./Info.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonSecondary = require('../Button/Index.jsx').Secondary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;
var ChurchActions = require('../../actions/ChurchActions');

function resolveSubDocuments (contribution) {
  if (!contribution) { contribution = {} }
  return contribution;
}

var Contribution = React.createClass({
  getInitialState: function () {
    this.contribution = resolveSubDocuments({});
    return {
      contribution: this.contribution
    }
  },

  componentWillMount: function () {
    this.contribution = resolveSubDocuments(this.props.contribution);

    if (this.contribution.date && moment(this.contribution.date).isValid()) {
      this.contribution.date = moment(this.contribution.date).format("MM/DD/YYYY");
    }

    if (!this.contribution._id && !this.contribution.date) {
      this.contribution.date = moment().format("MM/DD/YYYY");
    }

    this.setState({
      contribution: this.contribution
    });
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  componentWillReceiveProps: function (nextProps) {
    if (!nextProps.contribution) {
      return;
    }
    this.contribution = resolveSubDocuments(nextProps.contribution);

    if (nextProps.contribution.date && moment(nextProps.contribution.date).isValid()) {
      this.contribution.date = moment(nextProps.contribution.date).format("MM/DD/YYYY");
    }

    if (!nextProps.contribution._id && !nextProps.contribution.date) {
      nextProps.contribution.date = moment().format("MM/DD/YYYY");
    }

    this.setState({
      contribution: this.contribution
    });
  },

  render: function () {
    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>
            Contribution
          </h1>
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          <Info
            contribution={this.state.contribution}
            church={this.props.church}
            onChange={this.handleChange_Child} />
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          <ButtonPrimary label={"Save"} onClick={this.handleClick_Submit} />
          <span style={{display:"inline-block",width:"5px"}} />
          <ButtonSecondary label={"Cancel"} onClick={this.handleClick_Cancel} />
          <span style={{display:"inline-block",width:"5px"}} />
          <ButtonDanger label={"Delete"} onClick={this.handleClick_Delete} />
        </div>
      </div>
    )
  },

  handleChange_Child: function (contribution) {
    this.contribution = contribution;
    this.setState({
      contribution: this.contribution
    });
  },

  handleClick_Submit: function () {
    var church = this.props.church;
    var contributions = [];
    if (this.props.church.contributions) {
      contributions = this.props.church.contributions;
    }
    if (this.contribution._id) {
      for (var i = 0; i < contributions.length; i++) {
        if (contributions[i] == this.contribution._id) {
          contributions[i] = this.contribution;
        }
      }
      church.contributions = contributions;
      ChurchActions.update(church);
    } else {
      contributions.push(this.contribution);
      church.contributions = contributions;
      ChurchActions.update(church);
    }
    browserHistory.push("/church/" + this.props.church._id + "/contribution");
  },

  handleClick_Cancel: function () {
    browserHistory.push("/church/" + this.props.church._id + "/contribution");
  },

  handleClick_Delete: function () {
    if (!this.props.church || !this.props.church.contributions) {
      browserHistory.push("/church/" + this.props.church._id + "/contribution");
      return;
    }

    for (var i = 0; i < this.props.church.contributions.length; i++) {
      if (this.props.church.contributions[i]._id == this.state.contribution._id) {
        var church = this.props.church;
        church.contributions.splice(i,1);
        ChurchActions.update(church);
        browserHistory.push("/church/" + this.props.church._id + "/contribution");
        return;
      }
    }
  },
});

module.exports = Contribution;
