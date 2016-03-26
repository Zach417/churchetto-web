var React = require('react');

var Style = require('./Style.jsx');

var Footer = React.createClass({
	render: function(){
        var today = new Date(Date.now());
        return (
            <div style={Style.footer}>
                <div style={Style.border} className="col-lg-8 col-md-12 col-sm-12 col-xs-12 col-centered">
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                        <h5 style={Style.header}>
                            <b>&nbsp;</b>
                        </h5>
                        <p>
                            {String.fromCharCode(169)}{today.getFullYear()} Pension Consultants, Inc. All Rights Reserved.
                            Pension Consultants, Inc. is registered with U.S. Securities
                            and Exchange Commission as an investment adviser.
                        </p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                        <h5 style={Style.header}>
                            <b>Pension Consultants, Inc.</b>
                        </h5>
                        <p>
                            300 South Campbell<br />
                            Springfield, MO 65806<br />
                            417.889.4918<br />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Footer;