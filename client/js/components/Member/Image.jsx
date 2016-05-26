var React = require('react');
var $ = require('jquery');
var Style = require('./Style.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    var onUpload = this.props.onUpload;
    $('#member-image-form').on('submit', function (e) {
      e.preventDefault();
      //var formData = new FormData($('#member-image-form'));
      var formData = new FormData(this);
      $.ajax({
        type:'POST',
        url: '/img/s3/',
        data:formData,
        cache:false,
        contentType: false,
        processData: false,
        success: function (data) {
          if (data.success === true) {
            onUpload(data.path);
          } else {
            alert(data.message);
          }
        },
        error: function (data) {
          console.log("error");
          console.log(data);
        },
      });
    });

    $("#member-image-form-file").on("change", function() {
      $("#member-image-form").submit();
    });
  },

  render: function () {
    if (!this.props.path) {
      return (
        <div>
          <div
            id="member-image"
            onClick={this.handleClick_Upload}
            style={{
              backgroundImage: "url('https://pixabay.com/static/uploads/photo/2014/04/02/10/25/man-303792_960_720.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#f4f4f4",
              backgroundPosition: "center",
              height: "250px",
              border: "5px solid #ccc",
            }} />
          <form
            id="member-image-form"
            encType="multipart/form-data">
            <input
              id="member-image-form-file"
              name="file"
              type="file" />
            <input
              id="member-image-form-submit"
              style={{display:"none"}}
              type="submit"
              name="upload"
              value="Upload" />
          </form>
        </div>
      )
    }

    return (
      <div>
        <div
          id="member-image"
          onClick={this.handleClick_Upload}
          style={{
            backgroundImage: "url('/img/s3/" + this.props.path + "')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "50vw",
            border: "5px solid #ccc",
          }} />
          <form
            id="member-image-form"
            encType="multipart/form-data">
            <input
              id="member-image-form-file"
              name="file"
              type="file" />
            <input
              id="member-image-form-submit"
              style={{display:"none"}}
              type="submit"
              name="upload"
              value="Upload" />
          </form>
        </div>
    )
  },
});

module.exports = Component;
