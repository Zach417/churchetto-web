var React = require('react');
var Griddle = require('griddle-react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var MemberStore = require('../../stores/MemberStore');

var Info = React.createClass({
  getInitialState: function () {
    return {
      members: [],
    }
  },

  componentWillMount: function () {
    this.church = this.props.church;
    return this.setState({
      members: [{
        firstName: "Steve",
        lastName: "Johnson",
      }, {
        firstName: "Arnold",
        lastName: "Palmer",
      }, {
        firstName: "Phillip",
        lastName: "Blhasfknof",
      },{
        firstName: "Steve",
        lastName: "Johnson",
      }, {
        firstName: "Arnold",
        lastName: "Palmer",
      }, {
        firstName: "Phillip",
        lastName: "Blhasfknof",
      }]
    });
    MemberStore.getAssociatedFromChurch(this.church, function (docs) {
      this.setState({
        members: docs
      });
    }.bind(this));
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Members</h3>
            <div style={{position:"absolute",top:"0",right:"0"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_Add} />
              <span style={{display:"inline-block",width:"5px"}} />
              <ButtonDanger label={"Remove"} onClick={this.handleClick_Remove} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
            <Griddle results={this.getGriddleData()} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.state.members.length; i++) {
      result.push({
        "First Name": this.state.members[i].firstName,
        "Last Name": this.state.members[i].lastName,
      });
    }
    return result;
  },

  handleClick_Add: function () {

  },

  handleClick_Remove: function () {

  }
});

module.exports = Info;
