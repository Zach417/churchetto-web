var React = require('react');
var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');

var Member = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function () {
    return (
      <div style={Style.componentContainerNoPadding}>
        <div style={{padding:"0 20px 0 20px"}}>
          <h1 style={{wordBreak:"break-word"}}>
            {this.props.member.firstName + " "}
            {this.props.member.lastName}
          </h1>
        </div>
        <div style={{margin:"0 0 20px 0",backgroundColor: "#666666"}}>
          <Navigation cid={this.props.church._id} mid={this.props.member._id} />
        </div>
        <div style={{padding:"0 20px 20px 20px"}}>
          {this.props.children}
        </div>
      </div>
    )
  },
});

module.exports = Member;
