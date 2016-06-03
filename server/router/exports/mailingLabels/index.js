var fs = require('fs');
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
    var html = fs.readFileSync(path.join(__dirname,'./mailingLabels.html'), 'utf8');
    var options = {
      "format": "Letter",
      "base": "http://churchetto.com/",
      "httpHeaders": {
        "email": email,
        "token": accessToken,
      }
    };

    var members = "";
    var openRow = false;

    var addresses = [];
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
      if (!member.address) { member.address = {} }
      if (!member.address.line1) { member.address.line1 = "" }
      if (!member.address.line2) { member.address.line2 = "" }
      if (!member.address.city) { member.address.city = "" }
      if (!member.address.state) { member.address.state = "" }
      if (!member.address.zip) { member.address.zip = "" }

      var memberAddress =
        "<div>"
          + member.address.line1
          + " " + member.address.line2
          + "<br />" + member.address.city
          + ", " + member.address.state
          + " " + member.address.zip
        + "</div>";

      if (!member.address || !member.address.line1) {
        memberAddress = "<div>No Address Data Available</div>";
      }

      var hasAddress = false;
      addresses.map(function (address) {
        if (memberAddress.replace(/ /g,"").replace(/./g,"").replace(/,/g,"") == address.html.replace(/ /g,"").replace(/./g,"").replace(/,/g,"") && memberAddress != "<div>No Address Data Available</div>") {
          hasAddress = true;
          address.members.push(member);
        }
      });
      if (hasAddress === false) {
        addresses.push({
          html: memberAddress,
          members: [member],
        });
      }
    });

    console.log(addresses);

    addresses.map(function (address, i) {
      var remainder = i % 3;
      if (remainder === 0) {
        openRow = true;
        members = members
        + "<div class=\"row\">";
      }

      var hasHusband = false;
      var hasWife = false;
      var hasChild = false;

      address.members.map(function (member) {
        if (member.familyRelationship === "Husband") {
          hasHusband = true;
        } else if (member.familyRelationship === "Wife") {
          hasWife = true;
        } else if (member.familyRelationship === "Child") {
          hasChild = true;
        }
      });

      var name = "";
      if (address.members.length === 1) {
        name = address.members[0].firstName + " " + address.members[0].lastName;
      } else if (hasHusband === true && hasWife === true && hasChild === true) {
        name = "The " + address.members[0].lastName + "s"
      } else if (hasHusband === true && hasWife === true) {
        name = "Mr & Mrs " + address.members[0].lastName;
      } else {
        name = "The " + address.members[0].lastName + "s"
      }

      members = members
      + "<div class=\"col-xs-4\" style=\"padding:10px;\">"
        + "<div>"
          + "<h3 style=\"margin:0px;font-size:14px;\">"
            + name
          + "</h3>"
          + address.html
        + "</div>"
      + "</div>";

      if (remainder === 2) {
        openRow = false;
        members = members
        + "</div>";
      }
    });

    if (openRow === false) {
      members = members + "</div>"
    }

    html = html.replace('{MEMBERS}',members);

    //res.send(html);
    pdf.create(html, options).toStream(function(err, stream){
      if (err) return console.log(err);
      stream.pipe(res);
    });
  });

});

module.exports = router;
