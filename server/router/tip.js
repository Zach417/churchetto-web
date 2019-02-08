var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();

var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config.json"), "utf8"));
var stripe = require('stripe')(config.stripe.secret);

router.post('/', function (req, res) {
  var amount = req.body.amount;

  if (!amount) {
    return res.json({success: false, message: "Must supply an amount to tip"});
  } else if (amount < 0) {
    return res.json({success: false, message: "Cannot tip a value less than 0"});
  }

  stripe.charges.create({
    amount: Math.round(amount * 100),
    currency: "usd",
    description: "Churchetto Tip",
    source: req.body.paymentToken.id,
  }, function (err, charge) {
    if (err) {
      return res.json({success: false, message: "An error occurred while processing your payment:" + err.message});
    } else {
      return res.json({success: true, message: "Tip successfully placed"});
    }
  });
});

module.exports = router;
