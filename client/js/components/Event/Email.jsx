var React = require('react');
var moment = require('moment');
var Style = require('./Style.jsx');
var Input = require('../Form/Index.jsx').Input;
var Label = require('../Form/Index.jsx').Label;
var TextArea = require('../Form/Index.jsx').TextArea;
var Select = require('../Form/Index.jsx').Select;
var ButtonPrimary = require('../Button/Index.jsx').Primary;

var Email = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={Style.sectionContainer}>
        <div className="row-fluid">
          <h3 style={{margin:"0"}}>Email</h3>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={Style.detailColumn}>
          </div>
        </div>
      </div>
    )
  },
});
module.exports = Email;
