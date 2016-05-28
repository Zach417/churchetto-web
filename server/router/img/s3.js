var fs = require('fs');
var path = require('path');
var s3fs = require('s3fs');
var multiparty = require('connect-multiparty');
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../config.json"), "utf8"));
var s3fsBucket = new s3fs('churchetto-images', config.awsAccessCredentials);

var User = require('../../models/user');
var Church = require('../../models/church');

var express = require('express');
var router = express.Router();

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
        return callback(result);
      });
  });
}

router.use(multiparty());

router.post('/', function (req, res) {
  if (!req.session || !req.cookies.accessToken) {
    return res.json({
      success: false,
      message: "Authentication error."
    });
  }

  var file = req.files.file;

  if (file.size > 200000) {
    return res.json({
      success: false,
      message: "Upload failed: File must be less than 2MB",
    });
  }

  var stream = fs.createReadStream(file.path);
  var fileName = Math.floor(Math.random() * 1000000000);
  fileName = fileName + "_" + Date.now();
  var promise = s3fsBucket.writeFile(fileName, stream);
  return promise.then(function () {
    fs.unlink(file.path, function (err) {
      if (err) { console.error(err); }
    });
    res.json({
      success: true,
      path: fileName,
    });
  });
});

router.get('/:id', function (req, res) {
  var id = req.params.id;

  console.log(req.headers);

  if (req.headers.email && req.headers.accessToken) {
    var email = req.headers.email;
    var accessToken = req.headers.accessToken;

    console.log(email, accessToken);

    getChurchAndValidate({
      email: email,
      accessToken: accessToken,
      id: id,
    }, function (church) {
      var access = false;

      church.members.map(function (member) {
        if (member.imagePath === id) {
          access = true;
        }
      });

      if (access === true) {
        console.log('access true');
        s3fsBucket.readFile(req.params.id, function (err, data) {
          if (err) { console.error(err); }
         res.writeHead(200, {'Content-Type': 'image/gif' });
         res.end(data, 'binary');
        });
      } else {
        console.log('access false');
        return res.json({
          success: false,
          message: "Authentication error."
        });
      }
    });
  } else {
    if (!req.session || !req.cookies.accessToken) {
      return res.json({
        success: false,
        message: "Authentication error."
      });
    }

    s3fsBucket.readFile(req.params.id, function (err, data) {
      if (err) { console.error(err); }
     res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(data, 'binary');
    });
  }
});

module.exports = router;
