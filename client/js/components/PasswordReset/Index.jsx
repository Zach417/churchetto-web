var React = require('react');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var PasswordReset = React.createClass({
    render: function () {
        if (getParameterByName('id')) {
            return (

            )
        }

        return (
            <div>
            </div>
        )
    }
});

module.exports = PasswordReset;
