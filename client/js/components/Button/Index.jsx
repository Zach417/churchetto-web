var ButtonDanger = require('./ButtonDanger/Index.jsx');
var ButtonPrimary = require('./ButtonPrimary/Index.jsx');
var ButtonPrimaryLarge = require('./ButtonPrimaryLarge/Index.jsx');
var ButtonSecondary = require('./ButtonSecondary/Index.jsx');
var ButtonSecondaryLarge = require('./ButtonSecondaryLarge/Index.jsx');
var ButtonDefault = require('./ButtonSecondary/Index.jsx');

ButtonDefault.Danger = ButtonDanger;
ButtonDefault.Primary = ButtonPrimary;
ButtonDefault.Primary.Large = ButtonPrimaryLarge;
ButtonDefault.Secondary = ButtonSecondary;
ButtonDefault.Secondary.Large = ButtonSecondaryLarge;

module.exports = ButtonDefault;
