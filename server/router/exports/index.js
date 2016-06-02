var express = require('express');
var router = express.Router();

router.use('/birthday-report', require('./birthdayReport'));
router.use('/mailing-labels', require('./mailingLabels'));
router.use('/member-directory', require('./memberDirectory'));
router.use('/tax-statement', require('./taxStatement'));

module.exports = router;
