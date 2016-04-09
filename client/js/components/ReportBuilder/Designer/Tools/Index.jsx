var React = require('react');
var Style = require('./Style.jsx');
var ButtonSecondaryLarge = require('../../../Button/Index.jsx').Secondary.Large;

var ReportBuilder = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={Style.container}>
        <div id={this.getId()} className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
            <ButtonSecondaryLarge label={"Info"} onClick={this.handleClick_Info} />
            <ButtonSecondaryLarge label={"Members"} onClick={this.handleClick_Members} />
            <ButtonSecondaryLarge label={"Giving"} onClick={this.handleClick_Contribution} />
            <ButtonSecondaryLarge label={"Attendance"} onClick={this.handleClick_Attendance} />
            <ButtonSecondaryLarge label={"Events"} onClick={this.handleClick_Events} />
            <ButtonSecondaryLarge label={"Blah"} onClick={this.handleClick_More} />
          </div>
        </div>
      </div>
    )
  },

  getId: function () {
    if (this.props.report._id) {
      return "report-designer-tools-" + this.props.reports._id;
    } else {
      return "report-designer-tools-create";
    }
  }
});

module.exports = ReportBuilder;
