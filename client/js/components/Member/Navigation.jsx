var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var ButtonSecondaryLarge = require('../Button/Index.jsx').Secondary.Large;

var Navigation = React.createClass({
  render: function () {
    return (
      <div className="container-fluid" style={Style.navigationContainer}>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-12 col-sm-12 hidden-xs" style={{padding:"0"}}>
            <ButtonSecondaryLarge label={"Info"} onClick={this.handleClick_Info} />
            <ButtonSecondaryLarge label={"Contact"} onClick={this.handleClick_Contact} />
          </div>
          <div className="hidden-lg hidden-md hidden-sm col-xs-12" style={{padding:"0"}}>
            <div style={Style.extraSmallNavigationContainer}
              onClick={this.handleClick_Info}>Info</div>
            <div style={Style.extraSmallNavigationContainer}
              onClick={this.handleClick_Contact}>Contact</div>
        </div>
      </div>
    </div>
    )
  },

  handleClick_Info: function () {
    if (!this.props.mid) {
      browserHistory.push("/church/" + this.props.cid
        + "/member/create/info");
    } else {
      browserHistory.push("/church/" + this.props.cid
        + "/member/" + this.props.mid + "/info");
    }
  },

  handleClick_Contact: function () {
    if (!this.props.mid) {
      browserHistory.push("/church/" + this.props.cid
        + "/member/create/contact");
    } else {
      browserHistory.push("/church/" + this.props.cid
        + "/member/" + this.props.mid + "/contact");
    }
  }
});

module.exports = Navigation;
