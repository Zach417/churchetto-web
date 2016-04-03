var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonSecondaryLarge = require('../Button/Index.jsx').Secondary.Large;

var Navigation = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={Style.navigationContainer}>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0"}}>
            <ButtonSecondaryLarge label={"Info"} onClick={this.handleClick_Info} />
            <ButtonSecondaryLarge label={"Members"} onClick={this.handleClick_Members} />
          </div>
        </div>
      </div>
    )
  },

  handleClick_Info: function () {
    if (!this.props.mid) {
      browserHistory.push("/church/" + this.props.cid
        + "/group/create/info");
    } else {
      browserHistory.push("/church/" + this.props.cid
        + "/group/" + this.props.mid + "/info");
    }
  },

  handleClick_Members: function () {
    if (!this.props.mid) {
      browserHistory.push("/church/" + this.props.cid
        + "/group/create/members");
    } else {
      browserHistory.push("/church/" + this.props.cid
        + "/group/" + this.props.mid + "/members");
    }
  },
});

module.exports = Navigation;
