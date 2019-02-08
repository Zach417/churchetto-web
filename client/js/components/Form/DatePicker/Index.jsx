var React = require('react');
var moment = require('moment');
var $ = require('jquery');
var DatePicker = require('react-day-picker/DayPickerInput').default;
var Style = require('./Style.jsx');

function isValidDate(str) {
  if (!str) return false;
  // check if it's already a date object
  if (typeof str.getMonth === 'function') return true;

  var d = moment(str,'M/D/YYYY');
  if(d == null) return false;
  return d.isValid();
}

var FormDatePicker = React.createClass({
  getInitialState: function () {
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return {
      id: randLetter + Date.now(),
      format: "MM/DD/YYYY",
      key: 0,
      value: this.props.value,
      isHovered: false,
      isFocused: false,
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (isValidDate(nextProps.value)) {
      var state = this.state;
      state.value = nextProps.value;
      state.key++;
      this.setState(state);
    }
  },

  componentDidMount: function () {
    $("body").on('change', '#' + this.state.id + ' > div:first > input:first', this.handleChange_Input);
  },

  componentWillUnmount: function () {
    $("body").off('change', '#' + this.state.id + ' > div:first > input:first', this.handleChange_Input);
  },

  render: function() {
    var format = this.state.format;
    if (this.props.format) format = this.props.format;

    var value = this.state.value;
    if (typeof value == "string") value = new Date(value);

    $("body").off('change', '#' + this.state.id + ' > div:first > input:first', this.handleChange_Input);

    $("body").on('change', '#' + this.state.id + ' > div:first > input:first', this.handleChange_Input);

    return (
      <div id={this.state.id} style={{position:"relative"}}>
        <DatePicker
          key={this.state.id + "-" + this.state.key}
          formatDate={this.formatDate}
          format={format}
          placeholder={format}
          value={value}
          onDayChange={this.handleChange} />
        <div onClick={this.handleClick_Clear} style={{position:"absolute",top:"7px",right:"5px",padding:"5px",cursor:"pointer"}}>
          ✖
        </div>
      </div>
    )
  },

  formatDate: function (d, f, l) {
    var format = this.state.format;
    if (this.props.format) format = this.props.format;
    return moment(d).format(format);
  },

  handleClick_Clear: function () {
    var state = this.state;
    state.key++;
    state.value = null;
    this.setState(state);

    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, null);
    } else {
      this.props.onChange(null);
    }
  },

  handleChange_Input: function (event) {
    var value = event.target.value;
    var state = this.state;
    state.key++;
    state.value = value;
    this.setState(state);

    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },

  handleChange: function (date) {
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, date);
    } else {
      this.props.onChange(date);
    }

    if (isValidDate(date)) {
      var state = this.state;
      state.key++;
      state.value = date;
      this.setState(state);
    }
  },
});

module.exports = FormDatePicker;
