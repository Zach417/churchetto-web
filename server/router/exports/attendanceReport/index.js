var fs = require('fs');
var path = require('path');
var pdf = require('html-pdf');
var moment = require('moment');
require('moment-range');
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
  var start = req.query.start;
  var end = req.query.end;
  var range;

  if (start && end) {
    if (moment(start,"MM/DD/YYYY").isValid() === false || moment(end,"MM/DD/YYYY").isValid() === false) {
      return res.status(401).json({
        success: false,
        message: "Start date invalid."
      });
    }
    range = moment().range(moment(start,"MM/DD/YYYY"), moment(end,"MM/DD/YYYY"));
  } else {
    var now = new Date();
    start = "01/01/" + now.getFullYear();
    end = "12/31/" + now.getFullYear();
    range = moment().range(moment(start,"MM/DD/YYYY"), moment(end,"MM/DD/YYYY"));
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
    var html = fs.readFileSync(path.join(__dirname,'./attendanceReport.html'), 'utf8');
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

    var categories = [];
    church.attendance.map(function (attend) {
      if (categories.length === 0 && attend.category) {
        categories.push(attend.category);
        return;
      }
      var exists = false;
      categories.map(function (category) {
        if (category == attend.category) {
          exists = true;
        }
      });
      if (exists === false) {
        categories.push(attend.category);
      }
    });

    var categoriesHtml = "";
    categories.map(function (category, i) {
      var categoryHtml = fs.readFileSync(path.join(__dirname,'./category.html'), 'utf8');
      var attendanceTableHtml = fs.readFileSync(path.join(__dirname,'./attendanceTable.html'), 'utf8');
      var attendanceRowHtml = fs.readFileSync(path.join(__dirname,'./attendanceRow.html'), 'utf8');

      var header = "";
      header = header + "<h1 style=\"margin:0px;font-family:'Poiret One', cursive;\">" + church.name + "</h1>";
      if (church.phone && church.phone.main) {
        header = header + "<div>" + church.phone.main + "</div>";
      }
      header = header + "<div>" + churchAddress + "</div>";
      categoryHtml = categoryHtml.replace('{HEADER}',header);

      categoryHtml = categoryHtml.replace("{CATEGORY}", category);

      categoryHtml = categoryHtml.replace("{DATE_RANGE}",start + " - " + end);

      var attendanceCategoryTableHtml = attendanceTableHtml;
      var attendanceCategoryRowsHtml = "";
      var attendanceCategoryTotal = 0;

      church.attendance.filter(function (attend) {
        return attend.category == category;
      }).sort(function (a,b) {
        return a.date > b.date;
      }).map(function (attendance) {
        if (!attendance.date || range.contains(moment(attendance.date)) === false) { return; }

        var row = attendanceRowHtml;
        if (attendance.date) {
          row = row.replace("{DATE}",moment(attendance.date).format("MM/DD/YYYY"));
        } else {
          row = row.replace("{DATE}","-");
        }
        if (attendance.category) {
          row = row.replace("{CATEGORY}",attendance.category);
        } else {
          row = row.replace("{CATEGORY}","-");
        }
        if (attendance.count) {
          attendanceCategoryTotal = attendanceCategoryTotal + attendance.count;
          row = row.replace("{COUNT}",Number(attendance.count).toLocaleString());
        } else {
          row = row.replace("{COUNT}","-");
        }
        attendanceCategoryRowsHtml = attendanceCategoryRowsHtml + row;
      });

      attendanceCategoryTableHtml = attendanceCategoryTableHtml
        .replace("{TITLE}", category + " Attendance");
      attendanceCategoryTableHtml = attendanceCategoryTableHtml
        .replace("{TOTAL_ATTENDANCE}","Total " + category + " Attendance: " + Number(attendanceCategoryTotal).toLocaleString());
      attendanceCategoryTableHtml = attendanceCategoryTableHtml
        .replace("{ROWS}",attendanceCategoryRowsHtml);
      if (attendanceCategoryTotal > 0) {
        categoryHtml = categoryHtml.replace("{CATEGORY_ATTENDANCES}",attendanceCategoryTableHtml);
      } else {
        categoryHtml = categoryHtml.replace("{CATEGORY_ATTENDANCES}","");
      }

      if (i + 1 === categories.length) {
        categoryHtml = categoryHtml.replace("<div class=\"member member-margin\">","<div class=\"member-margin\">");
      }

      categoriesHtml = categoriesHtml + categoryHtml;
    });

    html = html.replace('{CATEGORIES}',categoriesHtml);

    //res.send(html);
    pdf.create(html, options).toStream(function(err, stream){
      if (err) return console.log(err);
      stream.pipe(res);
    });
  });

});

module.exports = router;
