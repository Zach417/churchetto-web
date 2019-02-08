var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var Button = React.createClass({
    getInitialState: function () {
        return {
            isSelected: '',
        }
    },

    componentWillMount: function () {
        this.setState({
            isSelected: false,
        });
    },

    render: function () {
        if (this.state.isSelected) {
            return (
                <span
                  style={Style.containerSelected}
                  className="col-lg-2 col-md-2 col-sm-2 col-xs-4"
                  onClick={this.props.onClick}
                  onMouseOver={this.handleMouseOver}
                  onMouseOut={this.handleMouseOut}>
                  <div style={Style.contents}>
                    {this.props.label}
                  </div>
                </span>
            )
        }
        return (
            <span
              style={Style.container}
              className="col-lg-2 col-md-2 col-sm-2 col-xs-4"
              onClick={this.props.onClick}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}>
              <div style={Style.contents}>
                {this.props.label}
              </div>
            </span>
        )
    },

    handleMouseOver: function () {
        this.setState({
            isSelected: true,
        });
    },

    handleMouseOut: function () {
        this.setState({
            isSelected: false,
        });
    },
});

module.exports = Button;
