var React = require('react');
var Style = require('./Style.jsx');
var PasswordResetComponent = require('./Index.jsx');

var Page = React.createClass({
  render: function() {
    return (
      <div style={Style.pageContainer}>
        <div className="container-fluid" style={{padding:"0"}}>
          <div className="row-fluid" style={Style.componentContainer}>
            <div className="col-lg-4 col-md-4 hidden-sm hidden-xs" />
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <PasswordResetComponent id={this.props.params.id}/>
						</div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
              <div className="hidden-lg hidden-md" style={{paddingTop: "10px"}} />
              <div style={Style.container}>
                <div style={Style.header}>
                  {"Almost there!"}
                </div>
                <div>
                  {"We'll be back up and running in no time."}
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
