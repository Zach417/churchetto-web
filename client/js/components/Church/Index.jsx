var React = require('react');
var browserHistory = require('react-router').browserHistory;
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');

var Church = React.createClass({
  render: function () {
    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>{this.props.church.name}</h1>
        </div>
        <div style={{margin:"0 0 20px 0",backgroundColor: "#666666"}}>
          <Navigation id={this.props.church._id} handleChange={this.handleChange_Navigation} />
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          {this.props.children}
        </div>
      </div>
    )
  },
});

module.exports = Church;
