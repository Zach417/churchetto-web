var $ = require('jquery');
var Slave = require('./Slave');

var Service = {
  users: new Slave("user"),
}

Service.signIn = function(options, callback) {
  $.ajax({
    url: '/sign-in',
    type: 'POST',
    contentType: "application/json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('email', options.email);
      xhr.setRequestHeader('password', options.password);
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Service.requestUserSetup = function(options, callback) {
  $.ajax({
    url: '/sign-up',
    type: 'POST',
    contentType: "application/json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('email', options.email);
      xhr.setRequestHeader('firstname', options.firstName);
      xhr.setRequestHeader('lastname', options.lastName);
      xhr.setRequestHeader('password', options.password);
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Service.setupUser = function(options, callback) {
  $.ajax({
    url: '/sign-up/' + options.id,
    type: 'POST',
    contentType: "application/json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('token', options.token);
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Service.requestPasswordReset = function(options, callback) {
  $.ajax({
    url: '/forgot-password',
    type: 'POST',
    contentType: "application/json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('email', options.email);
    },
    success: function(data) {
      callback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      console.log("XHR Status:", xhr.status);
      console.log("Thrown Error:", thrownError);
    }
  });
}

Service.resetPassword = function(options, callback) {
  $.ajax({
    url: '/forgot-password/' + options.id,
    type: 'POST',
    contentType: "application/json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader('token', options.token);
      xhr.setRequestHeader('password', options.password);
    },
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
