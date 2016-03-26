var React = require('react');
var $ = require('jquery');

var Style = require('./Style.jsx');
var Navigation = require('./Navigation.jsx');
var LinkItem = require('../Navigation/LinkItem.jsx');

function getNavigationSummary(windowLocationPathname) {
    var paths = windowLocationPathname.split("/");

    var currentPath = "/";

    return paths.map(function (path) {
        currentPath = currentPath + path + "/";

        if (path === "") {
            return (
                <span className="text-uppercase">
                    <b>{" // HOME"}</b>
                </span>
            )
        }

        return (
            <span className="text-uppercase">
                <b>{" // " + path}</b>
            </span>
        )
    });
}

var FiduciaryOversight = React.createClass({
    componentDidMount: function () {
        $("#navigation-summary").fadeIn("slow").animate({"margin-left": '+=5'}).animate({"margin-left": '-=5'});
    },

    render: function () {
        return (
            <div style={Style.headerPadding}>
                <div className="row-fluid">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                        <div id="navigation-summary" style={{display:"none",padding:"15px"}}>
                            {getNavigationSummary(window.location.pathname)}
                        </div>
                    </div>
                </div>
                <div className="row-fluid" className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                    <div className="col-lg-3 col-md-3 hidden-sm hidden-xs" style={{paddingLeft:"0",marginLeft:"0"}}>
                        <Navigation />
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{paddingLeft:"0",marginLeft:"0"}}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = FiduciaryOversight;
