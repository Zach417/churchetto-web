var React = require('react');
var $ = require('jquery');

var Style = require('./Style.jsx');

var Actions = require('../Actions/Index.jsx');
var ComplianceCalendar = require('../ComplianceCalendar/Index.jsx');
var Feed = require('../Feed/Index.jsx');
var Navigation = require('./Navigation.jsx');
var IndustryUpdates = require('../IndustryUpdates/Index.jsx');
var ComplianceCalendar = require('../ComplianceCalendar/Index.jsx');
var Header = require('../Navigation/Header.jsx');

var HomePage = React.createClass({
    componentDidMount: function () {
        window.scrollTo(0, 0);
    },

    render: function(){
        return (
            <div style={Style.headerPadding}>
                <div id="home-dashboard" className="row-fluid" style={{display:"none"}}>
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">

                    </div>
                </div>
                <div className="row-fluid">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                        <div className="col-lg-3 col-md-3 hidden-sm hidden-xs" style={{paddingLeft:"0",marginLeft:"0"}}>
                            <Navigation />
                        </div>
                        <div className="row-fluid">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{padding:"0",margin:"0"}}>
                                <div className="col-lg-8 col-md-8" style={{padding:"0",margin:"0"}}>
                                    <Feed />
                                </div>
                                <div className="col-lg-4 col-md-4 hidden-sm hidden-xs" style={{paddingRight:"0",marginRight:"0"}}>
                                	<Actions options={{isComponent:true}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = HomePage;
