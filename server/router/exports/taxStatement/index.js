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
    var html = fs.readFileSync(path.join(__dirname,'./taxStatement.html'), 'utf8');
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

    var members = "";
    church.members.sort(function (a,b) {
      if (!a.firstName) { a.firstName = ""; }
      if (!a.lastName) { a.lastName = ""; }
      if (!b.firstName) { b.firstName = ""; }
      if (!b.lastName) { b.lastName = ""; }
      var nameA = a.lastName.replace(/ /g,'').toLowerCase() + a.firstName.replace(/ /g,'').toLowerCase();
      var nameB = b.lastName.replace(/ /g,'').toLowerCase() + b.firstName.replace(/ /g,'').toLowerCase();
      if (nameA < nameB) { return -1; }
      if (nameA > nameB) { return 1; }
      return 0;
    }).map(function (member, i) {
      if (!member.address) { member.address = {} }
      if (!member.address.line1) { member.address.line1 = "" }
      if (!member.address.line2) { member.address.line2 = "" }
      if (!member.address.city) { member.address.city = "" }
      if (!member.address.state) { member.address.state = "" }
      if (!member.address.zip) { member.address.zip = "" }

      var memberHtml = fs.readFileSync(path.join(__dirname,'./member.html'), 'utf8');
      var contributionTableHtml = fs.readFileSync(path.join(__dirname,'./contributionTable.html'), 'utf8');
      var contributionRowHtml = fs.readFileSync(path.join(__dirname,'./contributionRow.html'), 'utf8');

      var header = "";
      header = header + "<h1 style=\"margin:0px;font-family:'Poiret One', cursive;\">" + church.name + "</h1>";
      if (church.phone && church.phone.main) {
        header = header + "<div>" + church.phone.main + "</div>";
      }
      header = header + "<div>" + churchAddress + "</div>";
      memberHtml = memberHtml.replace('{HEADER}',header);

      memberHtml = memberHtml.replace("{MEMBER_NAME}",
        member.lastName + ", " + member.firstName);

      memberHtml = memberHtml.replace("{MEMBER_ADDRESS}",
        "<div style=\"font-size:12px;\">"
          + member.address.line1
          + "<br />" + member.address.city
          + ", " + member.address.state
          + " " + member.address.zip
        + "</div>");

      memberHtml = memberHtml.replace("{DATE_RANGE}",start + " - " + end)

      var nonTaxDeductibleHtml = contributionTableHtml;
      var nonTaxDeductibleRowsHtml = "";
      var nonTaxDeductibleTotal = 0;
      var totalContributions = 0;
      church.contributions.sort(function (a,b) {
        return a.date < b.date;
      }).map(function (contribution) {
        if (contribution.memberId.toString() !== member._id.toString()) { return; }
        if (!contribution.date || range.contains(moment(contribution.date)) === false) { return; }
        if (contribution.amount) {
          totalContributions = totalContributions + contribution.amount;
        }
        if (contribution.isTaxDeductible !== false) { return; }

        var row = contributionRowHtml;
        if (contribution.date) {
          row = row.replace("{DATE}",moment(contribution.date).format("MM/DD/YYYY"));
        } else {
          row = row.replace("{DATE}","-");
        }
        if (contribution.description) {
          row = row.replace("{DESCRIPTION}",contribution.description);
        } else {
          row = row.replace("{DESCRIPTION}","-");
        }
        if (contribution.amount) {
          nonTaxDeductibleTotal = nonTaxDeductibleTotal + contribution.amount;
          row = row.replace("{AMOUNT}","$" + parseFloat(contribution.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
        } else {
          row = row.replace("{AMOUNT}","-");
        }
        nonTaxDeductibleRowsHtml = nonTaxDeductibleRowsHtml + row;
      });
      nonTaxDeductibleHtml = nonTaxDeductibleHtml.replace("{TITLE}","Non Tax Deductible Contributions");
      nonTaxDeductibleHtml = nonTaxDeductibleHtml.replace("{TOTAL_AMOUNT}","Total Non Tax Deductible: $" + parseFloat(nonTaxDeductibleTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
      nonTaxDeductibleHtml = nonTaxDeductibleHtml.replace("{ROWS}",nonTaxDeductibleRowsHtml);
      if (nonTaxDeductibleTotal > 0) {
        memberHtml = memberHtml.replace("{NON_TAX_DEDUCTIBLE_CONTRIBUTIONS}",nonTaxDeductibleHtml);
      } else {
        memberHtml = memberHtml.replace("{NON_TAX_DEDUCTIBLE_CONTRIBUTIONS}","");
      }

      var taxDeductibleHtml = contributionTableHtml;
      var taxDeductibleRowsHtml = "";
      var taxDeductibleTotal = 0;
      church.contributions.sort(function (a,b) {
        return a.date < b.date;
      }).map(function (contribution) {
        if (contribution.memberId.toString() !== member._id.toString()) { return; }
        if (!contribution.date || range.contains(moment(contribution.date)) === false) { return; }
        if (contribution.isTaxDeductible !== true) { return; }

        var row = contributionRowHtml;
        if (contribution.date) {
          row = row.replace("{DATE}",moment(contribution.date).format("MM/DD/YYYY"));
        } else {
          row = row.replace("{DATE}","-");
        }
        if (contribution.description) {
          row = row.replace("{DESCRIPTION}",contribution.description);
        } else {
          row = row.replace("{DESCRIPTION}","-");
        }
        if (contribution.amount) {
          taxDeductibleTotal = taxDeductibleTotal + contribution.amount;
          row = row.replace("{AMOUNT}","$" + parseFloat(contribution.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
        } else {
          row = row.replace("{AMOUNT}","-");
        }
        taxDeductibleRowsHtml = taxDeductibleRowsHtml + row;
      });
      taxDeductibleHtml = taxDeductibleHtml.replace("{TITLE}","Tax Deductible Contributions");
      taxDeductibleHtml = taxDeductibleHtml.replace("{TOTAL_AMOUNT}","Total Tax Deductible: $" + parseFloat(taxDeductibleTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
      taxDeductibleHtml = taxDeductibleHtml.replace("{ROWS}",taxDeductibleRowsHtml);
      if (taxDeductibleTotal > 0) {
        memberHtml = memberHtml.replace("{TAX_DEDUCTIBLE_CONTRIBUTIONS}",taxDeductibleHtml);
      } else {
        memberHtml = memberHtml.replace("{TAX_DEDUCTIBLE_CONTRIBUTIONS}","");
      }

      var otherHtml = contributionTableHtml;
      var otherRowsHtml = "";
      var otherTotal = 0;
      church.contributions.sort(function (a,b) {
        return a.date < b.date;
      }).map(function (contribution) {
        if (contribution.memberId.toString() !== member._id.toString()) { return; }
        if (!contribution.date || range.contains(moment(contribution.date)) === false) { return; }
        if (contribution.isTaxDeductible !== undefined) { return; }

        var row = contributionRowHtml;
        if (contribution.date) {
          row = row.replace("{DATE}",moment(contribution.date).format("MM/DD/YYYY"));
        } else {
          row = row.replace("{DATE}","-");
        }
        if (contribution.description) {
          row = row.replace("{DESCRIPTION}",contribution.description);
        } else {
          row = row.replace("{DESCRIPTION}","-");
        }
        if (contribution.amount) {
          otherTotal = otherTotal + contribution.amount;
          row = row.replace("{AMOUNT}","$" + parseFloat(contribution.amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
        } else {
          row = row.replace("{AMOUNT}","-");
        }
        otherRowsHtml = otherRowsHtml + row;
      });
      otherHtml = otherHtml.replace("{TITLE}","Other Contributions");
      otherHtml = otherHtml.replace("{TOTAL_AMOUNT}","Total Other: $" + parseFloat(otherTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
      otherHtml = otherHtml.replace("{ROWS}",otherRowsHtml);
      if (otherTotal > 0) {
        memberHtml = memberHtml.replace("{OTHER_CONTRIBUTIONS}",otherHtml);
      } else {
        memberHtml = memberHtml.replace("{OTHER_CONTRIBUTIONS}","");
      }

      memberHtml = memberHtml.replace("{TOTAL_CONTRIBUTIONS}","Total Contributions: $" + parseFloat(totalContributions).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))

      memberHtml = memberHtml.replace("{FOOTER}","No goods or services were provided in return for these contributions, other than intangible religious benefits.");

      if (i + 1 === church.members.length) {
        memberHtml = memberHtml.replace("<div class=\"member member-margin\">","<div class=\"member-margin\">");
      }

      members = members + memberHtml;
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
