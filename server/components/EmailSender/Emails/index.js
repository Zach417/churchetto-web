fs = require('fs');

module.exports = {
    PasswordReset: fs.readFileSync(__dirname + "/PasswordReset.html", "utf8"),
    UserSetupRequest: fs.readFileSync(__dirname + "/UserSetupRequest.html", "utf8"),
}
