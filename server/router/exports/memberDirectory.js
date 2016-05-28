var fs = require('fs');
var path = require('path');
var pdf = require('html-pdf');
var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Church = require('../../models/church');

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
    var html = fs.readFileSync(path.join(__dirname,'./memberDirectory.html'), 'utf8');
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

    var members = "";
    church.members.map(function (member) {
      if (!member.address) { member.address = {} }

      var image = "";
      if (member.imagePath) {
        image = "<img src=\"/img/s3/" + member.imagePath + "\" style=\"height:150px;padding-right:10px;\" />";
      }

      var memberAddress = "";
      if (member.address && member.address.line1) {
        memberAddress =
          "<div style=\"font-size:14px;\">"
            + member.address.line1
            + "<br />" + member.address.city
            + ", " + member.address.state
            + " " + member.address.zip
          + "</div>"
      } else {
        memberAddress = "<div style=\"font-size:14px;\">No Address Data Available</div>";
      }

      var memberPhone = "";
      if (member.phone && member.phone.main) {
        memberPhone =
          "<div style=\"font-size:14px;\">"
            + "<b>Phone:</b> " + member.phone.main
          + "</div>"
      } else {
        memberPhone =
          "<div style=\"font-size:14px;\">"
            + "<b>Phone:</b> n/a"
          + "</div>"
      }

      var memberEmail = "";
      if (member.email) {
        memberEmail =
          "<div style=\"font-size:14px;\">"
            + "<b>Email:</b> " + member.email
          + "</div>"
      } else {
        memberEmail =
          "<div style=\"font-size:14px;\">"
            + "<b>Email:</b> n/a"
          + "</div>"
      }

      members = members
      + "<div style=\"border-top:1px solid #ccc;margin-top:10px;padding-top:10px;\">"
        + image
        + "<div style=\"display:inline-block;vertical-align:top;\">"
          + "<h3 style=\"margin:0px;font-size:24px;\">"
            + member.firstName
            + " " + member.lastName
          + "</h3>"
          + memberAddress
          + "<br />"
          + memberPhone
          + memberEmail
      + "</div>";
    });
    html = html.replace('{MEMBERS}',members);

    res.send(html);
    /*pdf.create(html, options).toStream(function(err, stream){
      if (err) return console.log(err);
      stream.pipe(res);
    });*/
  });

});

module.exports = router;
