var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var ChurchStore = require('../../stores/ChurchStore');

var Church = React.createClass({
  getInitialState: function () {
    return {
      church: {
        phone: {},
        fax: {},
        address: {},
      },
    }
  },

  componentWillMount: function () {
    ChurchStore.getOne(this.props.id, function (doc) {
      this.setState({church:doc});
    }.bind(this));
  },

  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function () {
    return (
      <div style={Style.pageContainer}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
          style={{padding:"0"}}>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h3>Church</h3>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h3>Info</h3>
            <Label isRequired={true} label={"Name"} />
            <Input
              type={"text"}
              value={this.state.church.name}
              onChange={this.handleChange_Name} />

            <Label isRequired={false} label={"Website"} />
            <Input
              type={"text"}
              value={this.state.church.website}
              onChange={this.handleChange_Website} />
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h3>Contact</h3>

            <Label isRequired={false} label={"Main Phone"} />
            <Input
              type={"text"}
              value={this.state.church.phone.main}
              onChange={this.handleChange_PhoneMain} />

            <Label isRequired={false} label={"Main Fax"} />
            <Input
              type={"text"}
              value={this.state.church.fax.main}
              onChange={this.handleChange_FaxMain} />

          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <h3>Main Address</h3>

            <Label isRequired={false} label={"Address Line 1"} />
            <Input
              type={"text"}
              value={this.state.church.address.line1}
              onChange={this.handleChange_AddressLine1} />

            <Label isRequired={false} label={"Address Line 2"} />
            <Input
              type={"text"}
              value={this.state.church.address.line2}
              onChange={this.handleChange_AddressLine2} />

            <Label isRequired={false} label={"City"} />
            <Input
              type={"text"}
              value={this.state.church.address.city}
              onChange={this.handleChange_AddressCity} />

            <Label isRequired={false} label={"State"} />
            <Input
              type={"text"}
              value={this.state.church.address.state}
              onChange={this.handleChange_AddressState} />

            <Label isRequired={false} label={"Zip Code"} />
            <Input
              type={"text"}
              value={this.state.church.address.zip}
              onChange={this.handleChange_AddressZip} />
          </div>
        </div>
      </div>
    )
  },
});

module.exports = Church;
