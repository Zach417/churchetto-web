var React = require('react');
var Style = require('./Style.jsx');
var ForgotComponent = require('./Index.jsx');

var Page = React.createClass({
  componentDidMount: function() {
    window.scrollTo(0, 0);
  },

  render: function() {
    return (
      <div style={Style.pageContainer}>
        <div className="container-fluid">
          <div className="row-fluid">
            <div className="col-lg-4 col-md-4 hidden-sm hidden-xs" />
            <div style={Style.headerPadding} className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
              <ForgotComponent/>
						</div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "20px"}} />
              <div className="hidden-sm hidden-xs" style={{paddingTop: "60px"}} />
              <div style={Style.container}>
                <div style={Style.header}>
                  No worries!
                </div>
                <div>
                  {"We'll get your password back! "}
                  {"Just submit the request and you'll get emailed "}
                  {"instructions on how to reset it."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Page;
