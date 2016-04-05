var express = require('express');
var moment = require('moment');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var Church = require('../../models/church');
var RequestVolunteers = require('../../models/requestVolunteers');
var EmailSender = require('../../components/EmailSender');

function sendFailedJson(res) {
  res.json({
		success: false,
		message: 'Method failed.'
	});
}

function sendSuccessJson(res) {
  res.json({
    success: true,
    message: 'Method succeeded'
  });
}

function createToken(callback) {
  require('crypto').randomBytes(128, function(ex, buf) {
    var token = buf.toString('hex');
    callback(token);
  });
}

router.get('/event/:id/request-volunteers/:token', function (req, res) {
  var eventId = req.params.id;
  var token = req.params.token;

  if (!token || !eventId) {
    return sendFailedJson(res);
  }

  RequestVolunteers.find({
    "token": token,
    "eventId": eventId,
  }, function (err, requestVolunteers) {

    Church.findOne({
      "_id": requestVolunteers[0].churchId,
    }, function (err, church) {
      var rolesResult = [];
      for (var i = 0; i < church.events.length; i++) {
        for (var j = 0; j < church.events[i].volunteers.length; j++) {
          for (var k = 0; k < requestVolunteers[0].roles.length; k++) {
            if (church.events[i].volunteers[j].role == requestVolunteers[0].roles[k]) {
              if (!church.events[i].volunteers[j].memberId) {
                rolesResult.push(church.events[i].volunteers[j].role);
              }
            }
          }
        }
      }
      requestVolunteers[0].roles = rolesResult;
      return res.json(requestVolunteers[0]);
    });
  });
});

router.post('/event/:id/request-volunteers/:token', function (req, res) {
  var eventId = req.params.id;
  var token = req.params.token;
  var role = req.headers.role;

  if (!token || !eventId || !role) {
    return sendFailedJson(res);
  }

  RequestVolunteers.find({
    "token": token,
    "eventId": eventId,
  }, function (err, requestVolunteers) {
    Church.findOne({
      "_id": requestVolunteers[0].churchId,
    }, function (err, church) {
      for (var i = 0; i < church.events.length; i++) {
        for (var j = 0; j < church.events[i].volunteers.length; j++) {
          if (church.events[i].volunteers[j].role == role) {
            church.events[i].volunteers[j].memberId = requestVolunteers[0].memberId;
            church.save();
          }
        }
      }
      return res.json({
    		success: true,
    		message: "Successfully signed up.",
    	});
    });
  });
});

router.post('/event/:id/request-volunteers', function(req, res) {
  var churchId = req.headers.churchid;
  var eventId = req.params.id;
  if (!churchId || !eventId) {
    return sendFailedJson(res);
  }

	Church.findOne({
		"_id": churchId
	}, function(err, church) {
    var end = false;
    for (var i = 0; i < church.events.length; i++) {
      if (church.events[i]._id == eventId) {
        if (!church.events[i].volunteers) {
          return sendSuccessJson(res);
        }
        var volunteerPositions = [];
        var volunteerPositionsLabel = ""
        for (var j = 0; j < church.events[i].volunteers.length; j++) {
          if (!church.events[i].volunteers[j].memberId) {
            volunteerPositions.push(church.events[i].volunteers[j].role);
            volunteerPositionsLabel = volunteerPositionsLabel + ", " + church.events[i].volunteers[j].role;
          }
        }
        if (volunteerPositions.length === 0) {
          return sendSuccessJson(res);
        }
        volunteerPositionsLabel = volunteerPositionsLabel.substring(1);
        if (!church.events[i].group) {
          if (!church.members) {
            return sendSuccessJson(res);
          }
          for (var j = 0; j < church.members[j].length; j++) {
            var memberId = church.members[l]._id;
            var name = church.members[j].firstName;
            var to = church.members[j].email;
            var event = church.events[i].name;
            var churchName = church.name;

            createToken(function(tokenValue) {

              var requestVolunteers = new RequestVolunteers();
              requestVolunteers.churchId = churchId;
              requestVolunteers.memberId = memberId;
              requestVolunteers.eventId = eventId;
              requestVolunteers.email = to;
              requestVolunteers.token = tokenValue;
              requestVolunteers.roles = volunteerPositions;
              requestVolunteers.createdOn = moment().utc();
              requestVolunteers.save();

              var html = EmailSender.Emails.RequestVolunteers
                .replace(new RegExp("__LINK__", 'g'), "http://www.churchetto.com/event/" + eventId + "/request-volunteers/" + tokenValue)
                .replace("__ROLES__", volunteerPositionsLabel)
                .replace("__CHURCH__", churchName)
                .replace("__EVENT__", event)
                .replace("__NAME__", name);
              var emailSender = new EmailSender({
                from: "zach@churchetto.com",
                to: to,
                subject: "Churchetto - Event Volunteer Request",
                html: html,
              });
              emailSender.send();
            });
          }
          return sendSuccessJson(res);
        } else {
          for (var j = 0; j < church.groups.length; j++) {
            if (church.groups[j]._id.toString() == church.events[i].group.toString()) {
              for (var k = 0; k < church.groups[j].members.length; k++) {
                for (var l = 0; l < church.members.length; l++) {
                  if (church.members[l]._id.toString() == church.groups[j].members[k].memberId.toString()) {
                    var memberId = church.members[l]._id;
                    var name = church.members[l].firstName;
                    var to = church.members[l].email;
                    var event = church.events[i].name;
                    var churchName = church.name;
                    createToken(function(tokenValue) {

                      var requestVolunteers = new RequestVolunteers();
                      requestVolunteers.churchId = churchId;
                      requestVolunteers.memberId = memberId;
                      requestVolunteers.eventId = eventId;
                      requestVolunteers.email = to;
                      requestVolunteers.token = tokenValue;
                      requestVolunteers.roles = volunteerPositions;
                      requestVolunteers.sentOn = moment().utc();
                      requestVolunteers.save();

                      var html = EmailSender.Emails.RequestVolunteers
                        .replace(new RegExp("__LINK__", 'g'), "http://www.churchetto.com/event/" + eventId + "/request-volunteers/" + tokenValue)
                        .replace("__ROLES__", volunteerPositionsLabel)
                        .replace("__CHURCH__", churchName)
                        .replace("__EVENT__", event)
                        .replace("__NAME__", name);
                      var emailSender = new EmailSender({
                        from: "zach@churchetto.com",
                        to: to,
                        subject: "Churchetto - Event Volunteer Request",
                        html: html,
                      });
                      emailSender.send();
                    });
                  }
                }
              }
            }
          }
          return sendSuccessJson(res);
        }
      }
    }
  });
});

module.exports = router;
