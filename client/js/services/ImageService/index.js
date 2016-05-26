var $ = require('jquery');
var Service = {};

Service.upload = function (options, callback) {
  $.ajax({
    url: '/img/s3/',  //Server script to process data
    type: 'POST',
    xhr: function() {  // Custom XMLHttpRequest
        var myXhr = $.ajaxSettings.xhr();
        if(myXhr.upload){ // Check if upload property exists
            myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
        }
        return myXhr;
    },
    //Ajax events
    //beforeSend: beforeSendHandler,
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    },
    // Form data
    data: formData,
    //Options to tell jQuery not to process data or worry about content-type.
    cache: false,
    contentType: false,
    processData: false
  });
}

Service.read = function (options, callback) {
  $.ajax({
    url: '/img/s3/' + options.fileName,
    type: 'GET',
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

module.exports = Service;
