var React = require('react');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var LoginComponent = require('./Index.jsx');

var LoginPage = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div style={Style.pageContainer}>
        <div className="container-fluid">
          <div className="row-fluid">
            <div className="col-lg-4 col-md-4 hidden-sm hidden-xs" />
            <div style={Style.headerPadding} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
	            <LoginComponent/>
						</div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
              <div className="hidden-sm hidden-xs" style={{paddingTop: "60px"}} />
              <div style={Style.register}>
                <div style={Style.registerLink}>
                  {"New to Churchetto?"}<br/>
                  <Link to="/sign-up">Create an account.</Link>
                </div>
              </div>
              <div style={{paddingTop: "10px"}} />
              <div style={Style.register}>
                <div style={Style.registerLink}>
                  Forgot your password?<br/>
                  <Link to="/forgot-password">Reset it.</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = LoginPage;
