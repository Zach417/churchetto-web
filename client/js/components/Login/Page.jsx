var React = require('react');
var Style = require('./Style.jsx');
var LoginComponent = require('./Index.jsx');

var LoginPage = React.createClass({
	render: function () {
		return (
            <div style={{backgroundImage: "url('http://www.dumblittleman.com/wp-content/uploads/2010/01/o-STRESS-REDUCTION-facebook.jpg')", backgroundSize:"cover", paddingTop:"25px", paddingBottom:"50px", width: "100%", minHeight: "100%"}}>
                <div className="container-fluid">
                    <div className="row-fluid">
                        <div style={Style.headerPadding} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                            <div className="col-lg-8 col-md-8 col-sm-12">
                                <div style={Style.mainHeader} className="hidden-xs">{"Good to be back"}</div>
                                <div style={Style.mainHeaderMobile} className="hidden-lg hidden-md hidden-sm">{"Good to be back"}</div>
                                <div style={Style.mainBody}>
                                    {"You can count on this being a world class experience."}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="hidden-lg hidden-md" style={{paddingTop:"20px"}} />
                                <LoginComponent />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden-sm hidden-xs" style={{paddingTop:"300px"}} />
            </div>
		)
	}
});

module.exports = LoginPage;
