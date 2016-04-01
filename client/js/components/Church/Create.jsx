var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var Church = require('./Index.jsx');

var Create = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function () {
    return (
      <div style={Style.pageContainer}
        className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
        <div style={Style.componentContainer}>
          <h1 style={{margin:"5px 0"}}>Create a New Church</h1>
          <p style={{fontSize:"16px"}}>
            {"This is the place to create a church and add "}
            {"it to your user account. You don't have to fill "}
            {"out all of the information right now. You can always organize "}
            {"your church's information later or as you go."}
          </p>
          <p style={{fontSize:"16px"}}>
            {"If you want to find an existing church, click "}
            <Link to={"/church/find"}>here</Link>.
          </p>
        </div>
        <Church />
      </div>
    )
  },
});

module.exports = Create;
