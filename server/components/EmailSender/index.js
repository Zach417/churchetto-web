var nodemailer = require('nodemailer');
var path = require('path');
var Emails = require('./Emails');

var credentials = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../..", "emailCredentials.json"), "utf8"));

var EmailSender = function (options) {
    this.mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html,
    }

    this.send = function () {
        var transporter = nodemailer.createTransport("SMTP", {
            host: 'smtp.office365.com',
            port: '587',
            auth: {
                user: credentials.username,
                pass: credentials.password,
            },
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3'
            }
        });
        transporter.sendMail(this.mailOptions, function(error, info){
            if(error){ return console.log(error); }
            console.log('Message sent: ' + info.response);
        });
    }
}

module.exports = EmailSender;
module.exports.Emails = Emails;
