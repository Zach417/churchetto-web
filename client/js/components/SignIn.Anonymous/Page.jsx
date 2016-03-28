var React = require('react');
var Style = require('./Style.jsx');
var LoginComponent = require('./Index.jsx');

var LoginPage = React.createClass({
  render: function() {
    return (
      <div style={Style.pageContainer}>
        <div className="container-fluid">
          <div className="row-fluid">
            <div style={Style.headerPadding} className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-centered">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
	            <LoginComponent/>
						</div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = LoginPage;
