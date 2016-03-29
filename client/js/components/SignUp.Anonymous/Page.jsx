var React = require('react');
var Link = require('react-router').Link;

var Style = require('./Style.jsx');
var RegisterComponent = require('./Index.jsx');
var Highlights = require('./Highlights.jsx');

var RegisterPage = React.createClass({
  componentDidMount: function () {
    window.scrollTo(0,0);
  },

  render: function() {
    return (
      <div style={Style.pageContainer}>
        <div className="container-fluid">
          <div className="row-fluid">
            <div className="col-lg-4 col-md-4 hidden-sm hidden-xs">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
              <div className="hidden-sm hidden-xs" style={{paddingTop: "60px"}} />
              <Highlights />
            </div>
            <div style={Style.headerPadding} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
              <RegisterComponent children={this.props.children} />
						</div>
            <div className="hidden-lg hidden-md col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
              <div className="hidden-sm hidden-xs" style={{paddingTop: "60px"}} />
              <Highlights />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
              <div className="hidden-sm hidden-xs" style={{paddingTop: "60px"}} />
              <div style={Style.login}>
                <div style={Style.loginLink}>
                  {"Already have an account?"}<br/>
                  <Link to="/sign-in">Login here.</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = RegisterPage;
