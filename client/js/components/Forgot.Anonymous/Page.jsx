var React = require('react');
var Style = require('./Style.jsx');
var ForgotComponent = require('./Index.jsx');

var RegisterPage = React.createClass({
	render: function () {
		return (
            <div style={{paddingTop:"25px", paddingBottom:"50px", width: "100%"}}>
                <div className="container-fluid">
                    <div className="row-fluid">
                        <div style={Style.headerPadding} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div style={Style.mainHeader} className="hidden-xs">{"Whoops!"}</div>
                                <div style={Style.mainHeaderMobile} className="hidden-lg hidden-md hidden-sm">{"Whoops!"}</div>
                                <div style={Style.mainBody}>
                                    {"Passwords are hard to keep track of anyway. Submit a request, and we'll email you instructions to get a new password."}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="hidden-lg hidden-md" style={{paddingTop:"20px"}} />
					            <ForgotComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		)
	}
});

module.exports = RegisterPage;
