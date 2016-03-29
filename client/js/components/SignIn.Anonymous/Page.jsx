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
        <div className="container-fluid" style={{padding:"0"}}>
          <div className="row-fluid" style={Style.componentContainer}>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-centered">
	            <LoginComponent/>
              <div style={{paddingTop: "10px"}} />
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
