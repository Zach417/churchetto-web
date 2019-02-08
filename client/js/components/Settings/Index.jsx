var React = require('react');

var Style = require('./Style.jsx');

var UserSettings = require('./UserSettings.jsx');
var Navigation = require('./Navigation.jsx');

var Settings = React.createClass({
    render: function(){
        return (
            <div style={Style.headerPadding} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">
                    <Navigation />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    {this.props.children}
                </div>
                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">

                </div>
            </div>
        );
    }
});

module.exports = Settings;