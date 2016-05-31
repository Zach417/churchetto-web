var fs = require('fs');
var moment = require('moment');
require('moment-range');
var path = require('path');
var pdf = require('html-pdf');
var express = require('express');
var router = express.Router();
var User = require('../../../models/user');
var Church = require('../../../models/church');

function getChurchAndValidate (options, callback) {
  User.getUserAndValidate(options.email, options.accessToken, function (user) {
    Church
      .findOne({
        "_id": options.id
      })
      .where({
        $or: [{
          "_id": {
            $in : user.churches
          }
        }, {
          "createdBy": user._id,
        }]
      })
      .exec(function(err, result) {
        callback(result);
      });
  });
}

router.get('/:id', function (req, res) {
  var email = req.session.email;
  var accessToken = req.cookies.accessToken;
  var id = req.params.id;
  var month = req.query.month;

  if (!month) {
    month = "All";
  }

  if (!email || !accessToken || !id) {
    return res.status(401).json({
      success: false,
      message: "Authentication error."
    });
  }

  getChurchAndValidate({
    email: email,
    accessToken: accessToken,
    id: id,
  }, function (church) {
    // create html generation from returned church
    var html = fs.readFileSync(path.join(__dirname,'./birthdayReport.html'), 'utf8');
    var options = {
      "format": "Letter",
      "base": "http://churchetto.com/",
      "httpHeaders": {
        "email": email,
        "token": accessToken,
      }
    };

    var churchAddress = "";
    if (church.address && church.address.line1) {
      churchAddress =
        "<div style=\"font-size:14px;\">"
          + church.address.line1
          + "<br />" + church.address.city
          + ", " + church.address.state
          + " " + church.address.zip
        + "</div>"
    } else {
      churchAddress = "<div style=\"font-size:14px;\">No Address Data Available</div>";
    }

    var header = "";
    header = header + "<h1 style=\"margin:0px;font-family:'Poiret One', cursive;\">" + church.name + "</h1>";
    header = header + "<div>" + churchAddress + "</div>";
    html = html.replace('{HEADER}',header);

    html = html.replace("{DATE_RANGE}",month)

    var members = "";
    church.members.sort(function (a,b) {
      var nameA = "";
      var nameB = "";
      if (a.lastName) {
        nameA = a.lastName.toLowerCase();
        if (a.firstName) {
          nameA = nameA + a.firstName.toLowerCase();
        }
      }
      if (b.lastName) {
        nameB = b.lastName.toLowerCase();
        if (b.firstName) {
          nameB = nameB + b.firstName.toLowerCase();
        }
      }
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    }).map(function (member) {
      if (!member.dateOfBirth) { return; }
      if (month != "All" && moment(member.dateOfBirth).format("MMMM") !== month) {
        return;
      }



      members = members
      + "<tr style='font-size:14px;'>"
        + "<td style='padding: 2px 5px;'>"
          + member.lastName
          + ", " + member.firstName
        + "</td>"
        + "<td style='padding: 2px 5px;'>"
          + moment(member.dateOfBirth).format("MM/DD/YYYY")
        + "</td>"
      + "</tr>";
    });
    html = html.replace('{MEMBERS}',members);

    //res.send(html);
    pdf.create(html, options).toStream(function(err, stream){
      if (err) return console.log(err);
      stream.pipe(res);
    });
  });

});

module.exports = router;
