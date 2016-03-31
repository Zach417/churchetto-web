var React = require('react');
var Griddle = require('griddle-react');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var ButtonDanger = require('../Button/Index.jsx').Danger;
var CampusStore = require('../../stores/MemberStore');

var Campuses = React.createClass({
  getInitialState: function () {
    return {
      campuses: [],
    }
  },

  componentWillMount: function () {
    this.church = this.props.church;
    return this.setState({
      campuses: [{
        name: "Main Campus",
        address: {
          city: "Springfield",
          state: "MO",
          zip: "65802",
        },
      }]
    });
    CampusStore.getAssociatedFromChurch(this.church, function (docs) {
      this.setState({
        campuses: docs
      });
    }.bind(this));
  },

  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <div style={{position:"relative"}}>
            <h3 style={{display:"inline-block",margin:"0 0 17px 0"}}>Campuses</h3>
            <div style={{position:"absolute",top:"0",right:"0"}}>
              <ButtonPrimary label={"Add"} onClick={this.handleClick_AddMember} />
              <span style={{display:"inline-block",width:"5px"}} />
              <ButtonDanger label={"Remove"} onClick={this.handleClick_RemoveMember} />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Griddle results={this.getGriddleData()} />
          </div>
        </div>
      </div>
    )
  },

  getGriddleData: function () {
    var result = [];
    for (var i = 0; i < this.state.campuses.length; i++) {
      result.push({
        "Name": this.state.campuses[i].name,
        "City": this.state.campuses[i].address.city,
        "State": this.state.campuses[i].address.state,
        "Zip Code": this.state.campuses[i].address.zip,
      });
    }
    return result;
  },

  handleClick_Add: function () {

  },

  handleClick_Remove: function () {

  }
});

module.exports = Campuses;
