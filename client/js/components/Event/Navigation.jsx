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
            <ButtonSecondaryLarge label={"Attendees"} onClick={this.handleClick_Attendees} />
            <ButtonSecondaryLarge label={"Volunteers"} onClick={this.handleClick_Volunteers} />
          </div>
        </div>
      </div>
    )
  },

  handleClick_Info: function () {
    if (!this.props.mid) {
      browserHistory.push("/church/" + this.props.cid
        + "/event/create/info");
    } else {
      browserHistory.push("/church/" + this.props.cid
        + "/event/" + this.props.mid + "/info");
    }
  },

  handleClick_Attendees: function () {
    if (!this.props.mid) {
      browserHistory.push("/church/" + this.props.cid
        + "/event/create/attendees");
    } else {
      browserHistory.push("/church/" + this.props.cid
        + "/event/" + this.props.mid + "/attendees");
    }
  },

  handleClick_Volunteers: function () {
    if (!this.props.mid) {
      browserHistory.push("/church/" + this.props.cid
        + "/event/create/volunteers");
    } else {
      browserHistory.push("/church/" + this.props.cid
        + "/event/" + this.props.mid + "/volunteers");
    }
  },
});

module.exports = Navigation;
