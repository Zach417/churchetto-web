var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Style = require('./Style.jsx');

var ModalWindow = React.createClass({
  componentDidMount: function () {
    $('body').css('overflow-y', 'hidden');
  },

  componentWillUnmount: function () {
    $('body').css('overflow-y', 'scroll');
  },

  render: function() {
    var style = $.extend(true, {}, Style);
    if (this.props.backgroundColor) {
      style.container.backgroundColor = this.props.backgroundColor;
    }

    return (
      <div style={style.container}>
        <div style={style.closeContainer}>
          <span className="btn btn-link" style={style.close}
            onClick={this.handleClose}>
            close
          </span>
        </div>
        <div style={{padding: "0",height: "0"}}
					className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered">
          <div style={style.content}
						className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered">
            {this.props.content}
          </div>
        </div>
      </div>
    )
  },

  handleClose: function() {
    browserHistory.push(this.props.parentPath);
  }
});

module.exports = ModalWindow;
