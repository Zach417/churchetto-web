var React = require('react');
var Style = require('./Style.jsx');
var ButtonPrimary = require('../Button/Index.jsx').Primary;
var PlanManagerService = require('../../services/ChurchettoData');

var Register = React.createClass({
  render: function() {
    return (
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <ol style={Style.bannerList}>
          <li style={Style.bannerListItem1}>
            <div><b>Step 1:</b></div>
            <div>Create an account</div>
          </li>
          <li style={Style.bannerListItem2}>
            <div><b>Step 2:</b></div>
            <div>Choose your plan</div>
          </li>
          <li style={Style.bannerListItem3}>
            <div><b>Step 3:</b></div>
            <div>Go to your dashboard</div>
          </li>
        </ol>
      </div>
    )
  }
});

module.exports = Register;
